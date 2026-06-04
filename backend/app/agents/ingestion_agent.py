"""Agent 1 — Ingestion.

Fetches feedback from the 4 sources (LinkedIn, Google Reviews, App Store,
Play Store), normalises it, stores it, and indexes it into the pgvector RAG
corpus. Sources are mock fixtures here; swap `_fetch_source` for real
connectors without touching the rest of the pipeline.
"""
from __future__ import annotations

import json
from pathlib import Path

from sqlalchemy import select
from sqlalchemy.orm import Session

from .. import models
from ..config import SOURCES
from ..rag import index_feedback

_DATA = Path(__file__).resolve().parent.parent / "data" / "mock_sources.json"


def _fetch_source(source: str) -> list[dict]:
    """Return raw feedback for a source. Replace with real API calls later."""
    data = json.loads(_DATA.read_text(encoding="utf-8"))
    return data.get(source, [])


def ingest_all(db: Session) -> dict:
    summary: dict[str, int] = {}
    for source in SOURCES:
        added = 0
        for raw in _fetch_source(source):
            ext_id = raw.get("external_id", "")
            # Idempotent: skip rows already ingested for this source.
            exists = db.scalar(
                select(models.FeedbackItem.id).where(
                    models.FeedbackItem.source == source,
                    models.FeedbackItem.external_id == ext_id,
                )
            )
            if exists:
                continue
            item = models.FeedbackItem(
                source=source,
                external_id=ext_id,
                author=raw.get("author") or "",
                rating=raw.get("rating"),
                text=raw.get("text", ""),
                lang=raw.get("lang", "en"),
                meta=raw.get("meta", {}),
            )
            index_feedback(db, item)
            db.add(item)
            added += 1
        summary[source] = added
    db.commit()
    summary["total_added"] = sum(summary.values())
    return summary
