"""RAG store backed by pgvector.

Feedback items (from the 4 sources) form the corpus. New complaints are
embedded and matched against it for similar prior cases, which are fed to the
classification agent as grounding context.
"""
from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.orm import Session

from . import models
from .embeddings import embed


def index_feedback(db: Session, item: models.FeedbackItem) -> None:
    """Compute and persist the embedding for a feedback item."""
    item.embedding = embed(item.text)


def similar_feedback(db: Session, query_text: str, k: int = 5) -> list[dict]:
    """Return the k most similar feedback items to query_text."""
    qvec = embed(query_text)
    # cosine_distance -> smaller is closer; convert to a 0..1 similarity for display.
    dist = models.FeedbackItem.embedding.cosine_distance(qvec)
    stmt = (
        select(models.FeedbackItem, dist.label("distance"))
        .where(models.FeedbackItem.embedding.isnot(None))
        .order_by(dist)
        .limit(k)
    )
    out = []
    for item, distance in db.execute(stmt).all():
        out.append(
            {
                "id": item.id,
                "source": item.source,
                "author": item.author,
                "rating": item.rating,
                "text": item.text,
                "similarity": round(1.0 - float(distance), 4),
            }
        )
    return out
