from __future__ import annotations

import datetime as dt

from pydantic import BaseModel


class IntakeText(BaseModel):
    customer_name: str = ""
    rm_id: str = ""
    text: str = ""  # use this for an already-transcribed/typed complaint


class TicketOut(BaseModel):
    id: int
    complaint_id: int
    team: str
    status: str
    title: str
    body: str
    payload: dict
    created_at: dt.datetime

    class Config:
        from_attributes = True


class ComplaintOut(BaseModel):
    id: int
    customer_name: str
    rm_id: str
    channel: str
    transcript: str
    image_text: str
    category: str
    department: str
    confidence: float
    summary: str
    solution: str
    rationale: str
    created_at: dt.datetime
    tickets: list[TicketOut] = []

    class Config:
        from_attributes = True


class FeedbackOut(BaseModel):
    id: int
    source: str
    author: str
    rating: float | None
    text: str

    class Config:
        from_attributes = True
