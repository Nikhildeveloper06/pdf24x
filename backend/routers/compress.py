"""
Compress PDF — reduces file size by re-encoding embedded images at a
lower quality/resolution. Two modes:

  1. Manual level ("low" | "medium" | "high") — fixed scale/quality pair.
  2. Target size (target_kb) — iteratively tries progressively more
     aggressive settings until the output is at or under the target.

IMPORTANT: uses page.replace_image() rather than doc.update_stream()
to write recompressed images back in — update_stream() only swaps the
raw bytes without updating the image's associated PDF metadata
(colorspace/filter info), which can cause some viewers to render the
image as solid black even though the new JPEG bytes are valid on
their own. replace_image() updates everything consistently.

LIMITATION: this approach only recompresses raster images embedded in
the PDF. If a file's size mostly comes from fonts, vector graphics, or
other non-image content, no amount of image recompression will reach
an aggressive target — the response header reports whether the target
was actually reached so the frontend can show an honest message
instead of implying success.
"""

import fitz  # PyMuPDF's import name
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse

from core.file_handling import save_upload_to_temp, new_temp_output_path, cleanup_paths

router = APIRouter()

COMPRESSION_LEVELS = {
    "low": (0.85, 80),
    "medium": (0.65, 60),
    "high": (0.45, 35),
}

TARGET_SIZE_STEPS = [
    (0.90, 85),
    (0.80, 75),
    (0.70, 65),
    (0.60, 55),
    (0.50, 45),
    (0.40, 35),
    (0.30, 25),
    (0.20, 20),
]


def _compress_with_settings(input_path, output_path, scale: float, jpeg_quality: int):
    doc = fitz.open(str(input_path))

    for page in doc:
        for img in page.get_images(full=True):
            xref = img[0]
            try:
                base_image = doc.extract_image(xref)
                pix = fitz.Pixmap(base_image["image"])

                if scale < 1.0:
                    new_width = max(1, int(pix.width * scale))
                    new_height = max(1, int(pix.height * scale))
                    pix = fitz.Pixmap(pix, new_width, new_height)

                new_image_bytes = pix.tobytes("jpeg", jpg_quality=jpeg_quality)

                # page.replace_image (not doc.update_stream) — see module
                # docstring for why this matters.
                page.replace_image(xref, stream=new_image_bytes)
            except Exception:
                continue

    doc.save(str(output_path), garbage=4, deflate=True)
    doc.close()


@router.post("/compress")
async def compress_pdf(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    level: str = Form(None),
    target_kb: int = Form(None),
):
    if not level and not target_kb:
        raise HTTPException(
            status_code=400,
            detail="Provide either 'level' or 'target_kb'.",
        )

    if level and level not in COMPRESSION_LEVELS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid compression level '{level}'. Use low, medium, or high.",
        )

    input_path = None
    output_path = new_temp_output_path(suffix="_compressed.pdf")
    target_reached = True
    info_label = None

    try:
        input_path = await save_upload_to_temp(file)
        original_size = input_path.stat().st_size

        if target_kb:
            target_bytes = target_kb * 1024
            target_reached = False

            for scale, quality in TARGET_SIZE_STEPS:
                _compress_with_settings(input_path, output_path, scale, quality)
                result_size = output_path.stat().st_size

                if result_size <= target_bytes:
                    target_reached = True
                    info_label = f"target reached at {int(scale * 100)}% image scale"
                    break
            else:
                info_label = "target not reached - file size is mostly non-image content"

        else:
            scale, quality = COMPRESSION_LEVELS[level]
            _compress_with_settings(input_path, output_path, scale, quality)
            info_label = f"level={level}"

        final_size = output_path.stat().st_size

    except HTTPException:
        cleanup_paths(*(p for p in [input_path, output_path] if p))
        raise
    except Exception as e:
        cleanup_paths(*(p for p in [input_path, output_path] if p))
        raise HTTPException(status_code=500, detail=f"Compression failed: {e}")

    background_tasks.add_task(cleanup_paths, input_path, output_path)

    return FileResponse(
        path=output_path,
        media_type="application/pdf",
        filename="compressed.pdf",
        headers={
            "X-Compression-Info": info_label,
            "X-Target-Reached": str(target_reached).lower(),
            "X-Original-Size": str(original_size),
            "X-Final-Size": str(final_size),
        },
    )
