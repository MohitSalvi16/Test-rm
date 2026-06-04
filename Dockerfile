# Single-image deploy: build the Vite frontend, then serve it from FastAPI
# alongside the API. No nginx — uvicorn serves static files + /api routes.
#
#   podman build -t rm-manager .
#   podman run --rm -p 8080:8000 -e DATABASE_URL=... rm-manager
#
# Needs a reachable Postgres (pgvector) via DATABASE_URL — see docker-compose.yml.

# ── frontend build stage ──
FROM node:20-alpine AS web
WORKDIR /web
RUN npm install -g pnpm@10
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# ── backend + static serve stage ──
FROM python:3.12-slim
WORKDIR /app
ENV PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

COPY backend/requirements.txt .
RUN pip install -r requirements.txt

COPY backend/app ./app
COPY backend/demo.py .

# Bake the built frontend in where main.py expects it (app/static).
COPY --from=web /web/dist ./app/static

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
