"""
PDF24X backend — FastAPI app entry point.

Run locally with:
    uvicorn main:app --reload --port 8000

This mounts each tool's router under /api/pdf/... Routers live in
routers/ — one file per tool group, so the codebase stays manageable
as more tools get added.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import merge, compress, analyze, render, split, info, pdf_to_word

app = FastAPI(
    title="PDF24X API",
    description="Backend API powering PDF24X's free PDF, image, and file tools.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server
        # TODO: add your real production frontend domain here once deployed
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(merge.router, prefix="/api/pdf", tags=["pdf"])
app.include_router(compress.router, prefix="/api/pdf", tags=["pdf"])
app.include_router(analyze.router, prefix="/api/pdf", tags=["pdf"])
app.include_router(render.router, prefix="/api/pdf", tags=["pdf"])
app.include_router(split.router, prefix="/api/pdf", tags=["pdf"])
app.include_router(info.router, prefix="/api/pdf", tags=["pdf"])
app.include_router(pdf_to_word.router, prefix="/api/pdf", tags=["pdf"])


@app.get("/")
def health_check():
    """Simple endpoint to confirm the API is running."""
    return {"status": "ok", "service": "PDF24X API"}
