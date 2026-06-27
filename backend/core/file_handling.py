"""
Shared helpers for saving uploaded files to a temp directory and
cleaning them up afterward. Every tool router uses these so the
save/cleanup logic isn't duplicated per tool.
"""

import os
import uuid
import shutil
from pathlib import Path

from fastapi import UploadFile, HTTPException

TEMP_DIR = Path(__file__).parent.parent / "temp"
TEMP_DIR.mkdir(exist_ok=True)

MAX_FILE_SIZE_MB = 50
ALLOWED_PDF_TYPE = "application/pdf"


def validate_pdf(file: UploadFile) -> None:
    """Reject non-PDF uploads early, before any processing work happens."""
    if file.content_type != ALLOWED_PDF_TYPE:
        raise HTTPException(
            status_code=400,
            detail=f"'{file.filename}' is not a PDF. Only PDF files are accepted.",
        )


async def save_upload_to_temp(file: UploadFile) -> Path:
    """
    Save an uploaded file to a uniquely-named path inside temp/.
    Returns the saved file's path. Enforces a max size while streaming,
    so a huge upload doesn't fully buffer into memory first.
    """
    validate_pdf(file)

    dest_path = TEMP_DIR / f"{uuid.uuid4()}.pdf"
    size = 0
    max_bytes = MAX_FILE_SIZE_MB * 1024 * 1024

    with open(dest_path, "wb") as out_file:
        while chunk := await file.read(1024 * 1024):
            size += len(chunk)
            if size > max_bytes:
                out_file.close()
                dest_path.unlink(missing_ok=True)
                raise HTTPException(
                    status_code=413,
                    detail=f"'{file.filename}' exceeds the {MAX_FILE_SIZE_MB}MB limit.",
                )
            out_file.write(chunk)

    return dest_path


def new_temp_output_path(suffix: str = ".pdf") -> Path:
    """Generate a unique path in temp/ for a tool's output file."""
    return TEMP_DIR / f"{uuid.uuid4()}{suffix}"


def cleanup_paths(*paths: Path) -> None:
    """Delete temp files after they've been sent in the response."""
    for path in paths:
        try:
            if path.exists():
                path.unlink()
        except OSError:
            pass  # best-effort cleanup; don't crash the request over this
