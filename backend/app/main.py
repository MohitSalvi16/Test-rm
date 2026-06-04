from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import PERMANENT_DEPARTMENTS, SOURCES, settings
from .db import init_db
from .embeddings import using_real_model
from .routers import complaints, ingest, tickets


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(title="RM-Solver Agentic Flow", version="1.0.0", lifespan=lifespan)

# Allow the Vite frontend (localhost:5173) to call the API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ingest.router)
app.include_router(complaints.router)
app.include_router(tickets.router)


@app.get("/health", tags=["meta"])
def health():
    return {
        "status": "ok",
        "embedding_model": settings.embed_model if using_real_model() else "hash-fallback",
        "sources": SOURCES,
        "permanent_departments": PERMANENT_DEPARTMENTS,
        "llm_base_url": settings.llm_base_url,
    }
