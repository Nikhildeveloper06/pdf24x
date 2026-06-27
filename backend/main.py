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

from routers import merge

app = FastAPI(
    title="PDF24X API",
    description="Backend API powering PDF24X's free PDF, image, and file tools.",
    version="0.1.0",
)

# CORS — allows the Vite dev server (and later, your real frontend domain)
# to call this API from the browser. Without this, the browser blocks
# cross-origin requests by default.
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


@app.get("/")
def health_check():
    """Simple endpoint to confirm the API is running."""
    return {"status": "ok", "service": "PDF24X API"}
