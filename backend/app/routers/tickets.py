from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from .. import models, schemas
from ..db import get_session

router = APIRouter(prefix="/tickets", tags=["tickets"])


@router.get("", response_model=list[schemas.TicketOut])
def list_tickets(
    team: str | None = None,
    status: str | None = None,
    db: Session = Depends(get_session),
):
    """Team queues. team in: rm/response_team/uiux/tech/sales/business/security."""
    stmt = select(models.Ticket).order_by(models.Ticket.id.desc())
    if team:
        stmt = stmt.where(models.Ticket.team == team)
    if status:
        stmt = stmt.where(models.Ticket.status == status)
    return list(db.scalars(stmt).all())


@router.post("/{ticket_id}/status", response_model=schemas.TicketOut)
def set_status(ticket_id: int, status: str, db: Session = Depends(get_session)):
    obj = db.get(models.Ticket, ticket_id)
    if not obj:
        raise HTTPException(404, "not found")
    if status not in {"open", "ack", "closed"}:
        raise HTTPException(400, "status must be open/ack/closed")
    obj.status = status
    db.commit()
    db.refresh(obj)
    return obj
