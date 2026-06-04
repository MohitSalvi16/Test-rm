# RM-Solver — Agentic Flow Backend

Python + FastAPI service that powers the RM complaint pipeline. **It does not
touch the existing React UI** — it's a standalone API the frontend can call.

## The flow

```
                 ┌─────────────────────────────────────────────────────┐
                 │ Agent 1: Ingestion                                  │
  LinkedIn ─┐    │  fetch 4 sources → normalize → embed → pgvector RAG │
  Google ───┼──▶ └─────────────────────────────────────────────────────┘
  AppStore ─┤
  PlayStore ┘

  RM call audio ─▶ Agent 2: Transcription (audio→text, image→text via gateway)
                          │
                          ▼
                  Agent 3: Classification  ── uses RAG context ──┐
                  category = bakwas | temp | permanent           │
                  (permanent → uiux/tech/sales/business/security)│
                          │                                       │
                          ▼                                       │
                  Agent 4: Routing  ◀────────────────────────────┘
                    bakwas    → discard (audited, no ticket)
                    temp      → RM (solution) + Response Team
                    permanent → RM (solution) + owning Department
```

The **solution is always sent to the respective RM**. `temp` is additionally
shared with the Response Team; `permanent` is additionally routed to one of
UI/UX, Tech, Sales, Business, or Security.

## Setup

```bash
cd backend
cp .env.example .env          # fill in the real LLM gateway URL + token
docker compose up -d          # Postgres + pgvector on host :5433
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

> Embeddings: if `sentence-transformers` is installed it's used; otherwise a
> deterministic hash embedder (same dimension) runs offline so nothing breaks.
> Uncomment it in `requirements.txt` for higher-quality RAG.

The 3 API snippets you supplied map to env vars (`LLM_BASE_URL`,
`LLM_API_TOKEN`, `LLM_MODEL_*`). `verify=False` from the snippets →
`LLM_VERIFY_SSL=false`.

## Endpoints

| Method | Path | What |
|---|---|---|
| POST | `/ingest/run` | Agent 1 — pull all 4 sources into RAG |
| GET  | `/ingest/feedback?source=` | list ingested feedback |
| GET  | `/ingest/search?q=` | debug RAG similarity |
| POST | `/complaints/intake` | full flow on typed/transcribed text |
| POST | `/complaints/intake-call` | full flow from audio + screenshots (multipart) |
| GET  | `/complaints?category=&rm_id=` | list complaints |
| GET  | `/complaints/{id}` | complaint + its tickets |
| GET  | `/tickets?team=&status=` | team queues |
| POST | `/tickets/{id}/status?status=ack` | ack/close a ticket |
| GET  | `/health` | config + embedding mode |

`team` values: `rm`, `response_team`, `uiux`, `tech`, `sales`, `business`, `security`.

## Quick demo (no frontend)

```bash
python -m demo
```

Ingests the mock sources, runs 4 sample complaints through the agents, and
prints the category + routing for each.

## Mock data

`app/data/mock_sources.json` holds sample reviews per source. Swap
`ingestion_agent._fetch_source()` for real LinkedIn / Google / App Store /
Play Store connectors without changing anything downstream.

## Wiring the existing UI later (optional, no UI redesign)

The React components currently navigate with hardcoded data. To go live,
replace those mock values with `fetch()` calls — e.g. `VoiceRecording` posts
the recorded blob to `/complaints/intake-call`, then routes to the results
screen using the JSON returned. No layout/styling changes required.
