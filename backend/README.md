# Backend (.NET) — add later

This folder is reserved for the ASP.NET Core Web API that will power the actual
tools (PDF convert, merge, compress, etc.).

Suggested setup:

```bash
cd backend
dotnet new webapi -n Pdf24x.Api
```

The Vite dev server already proxies `/api` to `http://localhost:5000`
(see `frontend/vite.config.js`), so the frontend can call your endpoints during
development without CORS issues. For production, publish the React build
(`frontend/dist`) and serve it as static files from .NET, or host them
separately behind the same domain.
