import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from .config import PERMANENT_DEPARTMENTS, SOURCES, settings
from .db import init_db
from .embeddings import using_real_model
from .routers import complaints, ingest, tickets

# Built Vite frontend, copied here by the Dockerfile (COPY dist -> app/static).
STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(title="RM-Solver Agentic Flow", version="1.0.0", lifespan=lifespan)

# Allow the Vite frontend (localhost:5173) to call the API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "http://localhost:8090",
        "http://127.0.0.1:8090",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

# API under /api so it sits behind the same origin as the frontend
# (replaces the nginx /api/ proxy — frontend keeps calling /api/...).
app.include_router(ingest.router, prefix="/api")
app.include_router(complaints.router, prefix="/api")
app.include_router(tickets.router, prefix="/api")


@app.get("/api/health", tags=["meta"])
def health():
    return {
        "status": "ok",
        "embedding_model": settings.embed_model if using_real_model() else "hash-fallback",
        "sources": SOURCES,
        "permanent_departments": PERMANENT_DEPARTMENTS,
        "llm_base_url": settings.llm_base_url,
    }


# ── Serve the built frontend (single-image deploy, no nginx) ──
# Mounted only when the static bundle is present so `uvicorn` still runs
# in API-only / dev setups where the frontend hasn't been built.
if os.path.isdir(STATIC_DIR):
    assets_dir = os.path.join(STATIC_DIR, "assets")
    if os.path.isdir(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    @app.get("/{full_path:path}", include_in_schema=False)
    def spa(full_path: str):
        # Serve a real file when it exists, else fall back to index.html
        # so client-side (React Router) routes resolve.
        candidate = os.path.join(STATIC_DIR, full_path)
        if full_path and os.path.isfile(candidate):
            return FileResponse(candidate)
        return FileResponse(os.path.join(STATIC_DIR, "index.html"))
