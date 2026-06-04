import datetime as dt

from pgvector.sqlalchemy import Vector
from sqlalchemy import String, Text, DateTime, Float, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .config import settings
from .db import Base


class FeedbackItem(Base):
    """A single piece of feedback ingested from an external source.

    Doubles as the RAG corpus: each row carries an embedding used for
    similarity search when classifying new complaints.
    """

    __tablename__ = "feedback_items"

    id: Mapped[int] = mapped_column(primary_key=True)
    source: Mapped[str] = mapped_column(String(32), index=True)  # linkedin/google_review/...
    external_id: Mapped[str] = mapped_column(String(128), default="")
    author: Mapped[str] = mapped_column(String(128), default="")
    rating: Mapped[float | None] = mapped_column(Float, nullable=True)
    text: Mapped[str] = mapped_column(Text)
    lang: Mapped[str] = mapped_column(String(16), default="en")
    created_at: Mapped[dt.datetime] = mapped_column(DateTime, default=dt.datetime.utcnow)
    embedding = mapped_column(Vector(settings.embed_dim), nullable=True)
    meta: Mapped[dict] = mapped_column(JSON, default=dict)


class Complaint(Base):
    __tablename__ = "complaints"

    id: Mapped[int] = mapped_column(primary_key=True)
    customer_name: Mapped[str] = mapped_column(String(128), default="")
    rm_id: Mapped[str] = mapped_column(String(64), default="", index=True)
    channel: Mapped[str] = mapped_column(String(32), default="call")  # call/screenshot/text
    transcript: Mapped[str] = mapped_column(Text, default="")
    image_text: Mapped[str] = mapped_column(Text, default="")

    # Agent output
    category: Mapped[str] = mapped_column(String(16), default="", index=True)  # bakwas/temp/permanent
    department: Mapped[str] = mapped_column(String(32), default="")  # for permanent
    confidence: Mapped[float] = mapped_column(Float, default=0.0)
    summary: Mapped[str] = mapped_column(Text, default="")
    solution: Mapped[str] = mapped_column(Text, default="")
    rationale: Mapped[str] = mapped_column(Text, default="")

    created_at: Mapped[dt.datetime] = mapped_column(DateTime, default=dt.datetime.utcnow)

    tickets: Mapped[list["Ticket"]] = relationship(
        back_populates="complaint", cascade="all, delete-orphan"
    )


class Ticket(Base):
    """A routed work item delivered to a team's queue."""

    __tablename__ = "tickets"

    id: Mapped[int] = mapped_column(primary_key=True)
    complaint_id: Mapped[int] = mapped_column(ForeignKey("complaints.id"), index=True)
    team: Mapped[str] = mapped_column(String(32), index=True)  # rm/response_team/uiux/tech/...
    status: Mapped[str] = mapped_column(String(16), default="open")  # open/ack/closed
    title: Mapped[str] = mapped_column(String(256), default="")
    body: Mapped[str] = mapped_column(Text, default="")
    payload: Mapped[dict] = mapped_column(JSON, default=dict)
    created_at: Mapped[dt.datetime] = mapped_column(DateTime, default=dt.datetime.utcnow)

    complaint: Mapped["Complaint"] = relationship(back_populates="tickets")
