"""Agent 3 — Classification (the "agentic" brain).

Given a complaint (transcript + any screenshot text) and RAG context of
similar prior feedback, decide:

  category   : bakwas | temp | permanent
  department : one of uiux/tech/sales/business/security  (only if permanent)
  summary    : one-line summary of the issue
  solution   : suggested resolution for the RM
  rationale  : why this category/department
  confidence : 0..1

Definitions used in the prompt:
  - bakwas    : spam, gibberish, abuse, or irrelevant — discard, no action.
  - temp      : a one-off / transient issue the response team can resolve now
                (e.g. stuck transaction, login glitch, account-specific fix).
  - permanent : a systemic problem needing a product/department owner
                (a recurring bug, UX flaw, policy/sales/security gap).
"""
from __future__ import annotations

import json
import re

from sqlalchemy.orm import Session

from .. import llm
from ..config import PERMANENT_DEPARTMENTS
from ..rag import similar_feedback

_SYSTEM = (
    "You are a triage agent for a bank's Relationship Manager complaint system. "
    "Classify each complaint precisely and return STRICT JSON only — no prose, no markdown."
)

_SCHEMA_HINT = {
    "category": "bakwas | temp | permanent",
    "department": "uiux | tech | sales | business | security | null",
    "summary": "string",
    "solution": "string",
    "rationale": "string",
    "confidence": "number 0..1",
}


def _build_prompt(complaint_text: str, context: list[dict]) -> str:
    ctx_lines = []
    for c in context:
        ctx_lines.append(
            f"- ({c['source']}, sim={c['similarity']}) {c['text']}"
        )
    ctx_block = "\n".join(ctx_lines) if ctx_lines else "(none)"
    return (
        "Definitions:\n"
        "- bakwas: spam/gibberish/abuse/irrelevant. No action.\n"
        "- temp: one-off or transient issue the response team can fix now.\n"
        "- permanent: systemic issue needing a department owner.\n"
        f"- If permanent, pick department from: {', '.join(PERMANENT_DEPARTMENTS)}.\n\n"
        "Similar past feedback (RAG context, for grounding):\n"
        f"{ctx_block}\n\n"
        "Complaint to classify:\n"
        f'"""{complaint_text}"""\n\n'
        f"Return JSON exactly with keys: {json.dumps(_SCHEMA_HINT)}"
    )


def _parse_json(text: str) -> dict:
    """Best-effort extraction of a JSON object from model output."""
    text = text.strip()
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass
    m = re.search(r"\{.*\}", text, re.DOTALL)
    if m:
        try:
            return json.loads(m.group(0))
        except json.JSONDecodeError:
            pass
    return {}


def _normalize(result: dict) -> dict:
    category = str(result.get("category", "")).strip().lower()
    if category not in {"bakwas", "temp", "permanent"}:
        category = "temp"  # safe default: route to a human rather than discard
    department = str(result.get("department") or "").strip().lower()
    if category == "permanent":
        if department not in PERMANENT_DEPARTMENTS:
            department = "tech"  # default owner for unspecified systemic issues
    else:
        department = ""
    try:
        confidence = float(result.get("confidence", 0.0))
    except (TypeError, ValueError):
        confidence = 0.0
    confidence = max(0.0, min(1.0, confidence))
    return {
        "category": category,
        "department": department,
        "summary": str(result.get("summary", "")).strip(),
        "solution": str(result.get("solution", "")).strip(),
        "rationale": str(result.get("rationale", "")).strip(),
        "confidence": confidence,
    }


def classify(db: Session, complaint_text: str, k: int = 5) -> dict:
    context = similar_feedback(db, complaint_text, k=k)
    prompt = _build_prompt(complaint_text, context)
    raw = llm.chat(
        [
            {"role": "system", "content": _SYSTEM},
            {"role": "user", "content": prompt},
        ]
    )
    parsed = _normalize(_parse_json(raw))
    parsed["rag_context"] = context
    parsed["raw_model_output"] = raw
    return parsed
