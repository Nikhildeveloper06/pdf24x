"""
Compress PDF — reduces file size by re-encoding embedded images at a
lower quality/resolution. Three levels map to different image scale +
JPEG quality tradeoffs: lower quality = smaller file, more visible
compression artifacts on image-heavy pages. Text and vector content
are unaffected — only raster images embedded in the PDF are touched.
"""

import fitz  # PyMuPDF's import name
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse

from core.file_handling import save_upload_to_temp, new_temp_output_path, cleanup_paths

router = APIRouter()

# level -> (image scale factor, JPEG quality)
# Lower scale + lower quality = smaller output file.
COMPRESSION_LEVELS = {
    "low": (0.85, 80),     # mild compression, best quality retained
    "medium": (0.65, 60),  # balanced — good default for most users
    "high": (0.45, 35),    # aggressive — smallest file, most visible loss
}


@router.post("/compress")
async def compress_pdf(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    level: str = Form("medium"),
):
    """
    Accepts one PDF file plus a `level` field ("low" | "medium" | "high").
    Returns the compressed PDF.
    """
    if level not in COMPRESSION_LEVELS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid compression level '{level}'. Use low, medium, or high.",
        )

    scale, jpeg_quality = COMPRESSION_LEVELS[level]

    input_path = None
    output_path = new_temp_output_path(suffix="_compressed.pdf")

    try:
        input_path = await save_upload_to_temp(file)
        doc = fitz.open(str(input_path))

        # Walk every page, find embedded images, and replace each with
        # a re-encoded (smaller, lower-quality) version in place.
        for page in doc:
            image_list = page.get_images(full=True)
            for img in image_list:
                xref = img[0]
                try:
                    base_image = doc.extract_image(xref)
                    pix = fitz.Pixmap(base_image["image"])

                    # Downscale the image itself before re-encoding —
                    # this is what drives most of the size reduction,
                    # more than the JPEG quality setting alone.
                    if scale < 1.0:
                        new_width = max(1, int(pix.width * scale))
                        new_height = max(1, int(pix.height * scale))
                        pix = fitz.Pixmap(pix, new_width, new_height)

                    new_image_bytes = pix.tobytes("jpeg", jpg_quality=jpeg_quality)
                    doc.update_stream(xref, new_image_bytes)
                except Exception:
                    # If a specific image can't be re-encoded (unusual
                    # color space, etc.), skip it rather than failing
                    # the whole compression job.
                    continue

        # garbage=4 + deflate strips unused objects and recompresses
        # streams — meaningful savings even on text-only PDFs.
        doc.save(str(output_path), garbage=4, deflate=True)
        doc.close()

    except HTTPException:
        cleanup_paths(*(p for p in [input_path, output_path] if p), )
        raise
    except Exception as e:
        cleanup_paths(*(p for p in [input_path, output_path] if p))
        raise HTTPException(status_code=500, detail=f"Compression failed: {e}")

    background_tasks.add_task(cleanup_paths, input_path, output_path)

    return FileResponse(
        path=output_path,
        media_type="application/pdf",
        filename="compressed.pdf",
    )
