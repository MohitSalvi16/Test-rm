"""TEST-CHAT (removable) ------------------------------------------------------

Throwaway chat endpoint that forwards a message list to the LLM
chat-completion API and returns the assistant reply. Built for manual testing.

TO REMOVE AFTER TESTING:
  1. delete this file (backend/app/routers/chat.py)
  2. delete the two lines marked "TEST-CHAT" in backend/app/main.py
-----------------------------------------------------------------------------"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from .. import llm

router = APIRouter(prefix="/chat", tags=["test-chat"])


class ChatMessage(BaseModel):
    role: str  # "user" | "assistant" | "system"
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage]


class ChatResponse(BaseModel):
    reply: str


@router.post("", response_model=ChatResponse)
def chat(req: ChatRequest) -> ChatResponse:
    messages = [{"role": m.role, "content": m.content} for m in req.messages]
    try:
        reply = llm.chat(messages)
    except Exception as exc:  # surface gateway/config errors to the UI
        raise HTTPException(status_code=502, detail=f"LLM error: {exc}")
    return ChatResponse(reply=reply or "(empty response from model)")
