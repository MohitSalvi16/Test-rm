#!/usr/bin/env python3
"""Standalone smoke test for the LLM chat-completion gateway.

Mirrors the curl in the brief. Stdlib only -- no pip install, no venv needed:

    python test_llm.py
    python test_llm.py "who gave term india ?"

Config resolution (first wins):
    1. environment variables
    2. backend/.env (same folder as this file)
    3. built-in defaults (the placeholder values)
"""
import json
import os
import ssl
import sys
import urllib.request


def load_dotenv(path: str) -> None:
    """Minimal .env loader -- only sets keys not already in the environment."""
    if not os.path.isfile(path):
        return
    with open(path, encoding="utf-8") as fh:
        for line in fh:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, _, val = line.partition("=")
            os.environ.setdefault(key.strip(), val.strip().strip('"').strip("'"))


load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env"))

BASE_URL = os.environ.get("LLM_BASE_URL", "https://some-url")
TOKEN = os.environ.get("LLM_API_TOKEN", "test-token")
MODEL = os.environ.get("LLM_MODEL_CHAT", "model-name")
VERIFY_SSL = os.environ.get("LLM_VERIFY_SSL", "false").lower() in ("1", "true", "yes")

prompt = sys.argv[1] if len(sys.argv) > 1 else "who gave term india ?"

payload = json.dumps(
    {"model": MODEL, "messages": [{"role": "user", "content": prompt}]}
).encode("utf-8")

req = urllib.request.Request(
    BASE_URL,
    data=payload,
    method="POST",
    headers={
        "Content-Type": "application/json",
        "Authorization": f"Bearer {TOKEN}",
    },
)

# Match the backend default (llm_verify_ssl=false) for internal gateways.
ctx = ssl.create_default_context()
if not VERIFY_SSL:
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE


def extract(data: dict) -> str:
    try:
        content = data["choices"][0]["message"]["content"]
        if isinstance(content, list):  # some gateways return content parts
            return "".join(p.get("text", "") for p in content if isinstance(p, dict))
        return content or ""
    except (KeyError, IndexError, TypeError):
        return ""


print(f"POST {BASE_URL}")
print(f"model={MODEL}  prompt={prompt!r}\n")

try:
    with urllib.request.urlopen(req, context=ctx, timeout=120) as resp:
        body = resp.read().decode("utf-8")
        print(f"HTTP {resp.status}")
        try:
            data = json.loads(body)
            reply = extract(data)
            print("\n--- assistant reply ---")
            print(reply or "(no content; raw response below)")
            if not reply:
                print(json.dumps(data, indent=2)[:2000])
        except json.JSONDecodeError:
            print(body[:2000])
except urllib.error.HTTPError as e:
    print(f"HTTP {e.code} error")
    print(e.read().decode("utf-8", "replace")[:2000])
    sys.exit(1)
except Exception as e:  # connection / DNS / SSL / timeout
    print(f"request failed: {type(e).__name__}: {e}")
    sys.exit(1)
