"""Agent 4 — Routing.

Turns a classified complaint into team tickets per the business rules:

  bakwas    -> no ticket (discarded; complaint kept for audit).
  temp      -> RM (solution) + Response Team.
  permanent -> RM (solution) + the owning department
               (uiux / tech / sales / business / security).

The "solution is sent to the respective RM" in every actionable case.
"""
from __future__ import annotations

from sqlalchemy.orm import Session

from .. import models


def _make_ticket(complaint: models.Complaint, team: str, title: str, body: str) -> models.Ticket:
    return models.Ticket(
        complaint_id=complaint.id,
        team=team,
        title=title[:256],
        body=body,
        payload={
            "category": complaint.category,
            "department": complaint.department,
            "customer_name": complaint.customer_name,
            "rm_id": complaint.rm_id,
            "summary": complaint.summary,
            "solution": complaint.solution,
            "confidence": complaint.confidence,
        },
    )


def route(db: Session, complaint: models.Complaint) -> list[models.Ticket]:
    tickets: list[models.Ticket] = []
    cat = complaint.category

    if cat == "bakwas":
        db.commit()
        return tickets  # discarded — nothing routed

    # Solution always goes to the owning RM.
    tickets.append(
        _make_ticket(
            complaint,
            team="rm",
            title=f"Solution for {complaint.customer_name or 'customer'}",
            body=complaint.solution or complaint.summary,
        )
    )

    if cat == "temp":
        tickets.append(
            _make_ticket(
                complaint,
                team="response_team",
                title=f"[TEMP] {complaint.summary}",
                body=complaint.solution or complaint.summary,
            )
        )
    elif cat == "permanent":
        dept = complaint.department or "tech"
        tickets.append(
            _make_ticket(
                complaint,
                team=dept,
                title=f"[PERMANENT] {complaint.summary}",
                body=complaint.rationale or complaint.summary,
            )
        )

    db.add_all(tickets)
    db.commit()
    for t in tickets:
        db.refresh(t)
    return tickets
