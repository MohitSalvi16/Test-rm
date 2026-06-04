from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from .. import models, schemas
from ..agents import ingestion_agent
from ..db import get_session
from ..rag import similar_feedback

router = APIRouter(prefix="/ingest", tags=["ingestion"])


@router.post("/run")
def run_ingestion(db: Session = Depends(get_session)):
    """Agent 1: pull LinkedIn / Google Reviews / App Store / Play Store into RAG."""
    return ingestion_agent.ingest_all(db)


@router.get("/feedback", response_model=list[schemas.FeedbackOut])
def list_feedback(
    source: str | None = None,
    limit: int = Query(50, le=500),
    db: Session = Depends(get_session),
):
    stmt = select(models.FeedbackItem).order_by(models.FeedbackItem.id.desc()).limit(limit)
    if source:
        stmt = stmt.where(models.FeedbackItem.source == source)
    return list(db.scalars(stmt).all())


@router.get("/search")
def rag_search(q: str, k: int = 5, db: Session = Depends(get_session)):
    """Debug endpoint: see what the RAG store returns for a query."""
    return {"query": q, "results": similar_feedback(db, q, k=k)}
