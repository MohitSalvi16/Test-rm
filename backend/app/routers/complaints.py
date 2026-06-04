from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy import select
from sqlalchemy.orm import Session

from .. import models, schemas
from ..agents import orchestrator
from ..db import get_session

router = APIRouter(prefix="/complaints", tags=["complaints"])


@router.post("/intake", response_model=schemas.ComplaintOut)
def intake_text(body: schemas.IntakeText, db: Session = Depends(get_session)):
    """Run the full agentic flow on an already-transcribed/typed complaint."""
    if not body.text.strip():
        raise HTTPException(400, "text is required")
    complaint = orchestrator.intake(
        db, customer_name=body.customer_name, rm_id=body.rm_id, text=body.text
    )
    return complaint


@router.post("/intake-call", response_model=schemas.ComplaintOut)
async def intake_call(
    customer_name: str = Form(""),
    rm_id: str = Form(""),
    audio: UploadFile | None = File(None),
    audio_format: str = Form("mp3"),
    images: list[UploadFile] = File(default=[]),
    db: Session = Depends(get_session),
):
    """Run the full flow from a recorded call (audio) and optional screenshots."""
    audio_bytes = await audio.read() if audio else None
    image_payload = []
    for img in images or []:
        image_payload.append((await img.read(), img.content_type or "image/png"))
    if not audio_bytes and not image_payload:
        raise HTTPException(400, "provide audio and/or images")
    complaint = orchestrator.intake(
        db,
        customer_name=customer_name,
        rm_id=rm_id,
        audio_bytes=audio_bytes,
        audio_format=audio_format,
        images=image_payload,
    )
    return complaint


@router.get("", response_model=list[schemas.ComplaintOut])
def list_complaints(
    category: str | None = None,
    rm_id: str | None = None,
    db: Session = Depends(get_session),
):
    stmt = select(models.Complaint).order_by(models.Complaint.id.desc())
    if category:
        stmt = stmt.where(models.Complaint.category == category)
    if rm_id:
        stmt = stmt.where(models.Complaint.rm_id == rm_id)
    return list(db.scalars(stmt).all())


@router.get("/{complaint_id}", response_model=schemas.ComplaintOut)
def get_complaint(complaint_id: int, db: Session = Depends(get_session)):
    obj = db.get(models.Complaint, complaint_id)
    if not obj:
        raise HTTPException(404, "not found")
    return obj
