"""Minimal chat-only server for testing the LLM gateway from the frontend.

No DB, no numpy, no embeddings -- just the /api/chat endpoint the chat widget
calls. Needs only: fastapi, uvicorn, requests.

    pip install fastapi "uvicorn[standard]" requests
    export LLM_BASE_URL=...   LLM_API_TOKEN=...   LLM_MODEL_CHAT=...
    uvicorn chat_server:app --port 8000

Then run the frontend (pnpm dev) and use the chat bubble.
"""
import os

import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Load backend/.env if present (so the same creds as the main app are reused).
try:
    from dotenv import load_dotenv

    load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))
except Exception:
    pass

BASE_URL = os.environ.get("LLM_BASE_URL", "https://some-url")
TOKEN = os.environ.get("LLM_API_TOKEN", "test-token")
MODEL = os.environ.get("LLM_MODEL_CHAT", "model-name")
VERIFY_SSL = os.environ.get("LLM_VERIFY_SSL", "false").lower() in ("1", "true", "yes")

app = FastAPI(title="Neevaran chat-only")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # test server; allow the vite dev origin
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage]


@app.post("/api/chat")
def chat(req: ChatRequest):
    payload = {
        "model": MODEL,
        "messages": [{"role": m.role, "content": m.content} for m in req.messages],
    }
    try:
        resp = requests.post(
            BASE_URL,
            headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"},
            json=payload,
            verify=VERIFY_SSL,
            timeout=120,
        )
        resp.raise_for_status()
        data = resp.json()
        content = data["choices"][0]["message"]["content"]
        if isinstance(content, list):
            content = "".join(p.get("text", "") for p in content if isinstance(p, dict))
        return {"reply": content or "(empty response)"}
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"LLM error: {exc}")
