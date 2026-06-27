# Backend (Python / FastAPI)

This is the API powering PDF24X's tools - file upload, processing, and
download endpoints, organized by tool in routers/.

## Requirements

- Python 3.10+
- Ghostscript - required by the Compress PDF tool.
  Install via Homebrew on Mac:

  brew install ghostscript

  Verify it is on your PATH:

  gs --version

  Without Ghostscript installed, /api/pdf/compress will fail at runtime.

## Setup

  cd backend
  python3 -m venv venv
  source venv/bin/activate
  pip install -r requirements.txt

## Running locally

  source venv/bin/activate
  uvicorn main:app --reload --port 8000

The Vite dev server proxies /api requests to http://localhost:8000
(see frontend/vite.config.js), so the frontend can call these endpoints
during development without CORS issues.

## Project structure

backend/
  main.py              FastAPI app, mounts all routers
  requirements.txt
  routers/
    merge.py           POST /api/pdf/merge
    compress.py        POST /api/pdf/compress (uses Ghostscript)
    analyze.py         POST /api/pdf/analyze (suggests a compression level)
    render.py          GET  /api/pdf/render-page (page-to-image, for previews)
  core/
    file_handling.py   shared upload/temp-file/session helpers
  temp/                gitignored - working directory for uploads/outputs

## Notes

Uploaded files are processed in temp/ and deleted automatically after
use (or after a short session window, for features like before/after
comparison that need brief follow-up access to a file).

Compress PDF uses Ghostscript rather than manipulating PDF image objects
directly - an earlier PyMuPDF-based approach had rare but real
correctness issues on certain files (corrupted/missing images in edge
cases). Ghostscript is the same class of tool many production PDF
services use under the hood, and handles these cases reliably.
