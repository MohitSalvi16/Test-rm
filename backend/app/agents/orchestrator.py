"""Orchestrator — wires the agents into one complaint intake flow.

  audio/screenshots/text  ->  transcription
                          ->  classification (RAG-grounded)
                          ->  persist complaint
                          ->  routing (team tickets)
"""
from __future__ import annotations

from sqlalchemy.orm import Session

from .. import models
from . import classification_agent, routing_agent, transcription_agent


def intake(
    db: Session,
    *,
    customer_name: str = "",
    rm_id: str = "",
    text: str = "",
    audio_bytes: bytes | None = None,
    audio_format: str = "mp3",
    images: list[tuple[bytes, str]] | None = None,
) -> models.Complaint:
    # 1) Build the complaint text from whatever channels were provided.
    transcript = text or ""
    channel = "text"
    if audio_bytes:
        transcript = transcription_agent.transcribe_call(audio_bytes, fmt=audio_format)
        channel = "call"
    image_text = ""
    if images:
        image_text = transcription_agent.read_screenshots(images)
        if channel == "text":
            channel = "screenshot"

    full_text = transcript
    if image_text:
        full_text = f"{transcript}\n\n{image_text}".strip()

    # 2) Classify with RAG grounding.
    result = classification_agent.classify(db, full_text)

    # 3) Persist.
    complaint = models.Complaint(
        customer_name=customer_name,
        rm_id=rm_id,
        channel=channel,
        transcript=transcript,
        image_text=image_text,
        category=result["category"],
        department=result["department"],
        confidence=result["confidence"],
        summary=result["summary"],
        solution=result["solution"],
        rationale=result["rationale"],
    )
    db.add(complaint)
    db.commit()
    db.refresh(complaint)

    # 4) Route to team queues.
    routing_agent.route(db, complaint)
    db.refresh(complaint)
    return complaint
