"""Thin client over the OpenAI-compatible gateway from the user's snippets.

Three capabilities, one endpoint (/chat/completions style):
  - chat(messages)          -> text
  - transcribe(audio_bytes) -> text   (input_audio content part)
  - image_to_text(img)      -> text   (image_url content part)
"""
from __future__ import annotations

import base64
import warnings

import requests

from .config import settings

# The snippets used verify=False; silence the noisy InsecureRequestWarning
# when SSL verification is intentionally disabled for an internal gateway.
if not settings.llm_verify_ssl:
    try:
        from urllib3.exceptions import InsecureRequestWarning

        warnings.simplefilter("ignore", InsecureRequestWarning)
    except Exception:
        pass


def _headers() -> dict:
    return {
        "Authorization": f"Bearer {settings.llm_api_token}",
        "Content-Type": "application/json",
    }


def _post(payload: dict) -> dict:
    resp = requests.post(
        settings.llm_base_url,
        headers=_headers(),
        json=payload,
        verify=settings.llm_verify_ssl,
        timeout=settings.llm_timeout,
    )
    resp.raise_for_status()
    return resp.json()


def _extract(data: dict) -> str:
    """Pull assistant text from an OpenAI-style response."""
    try:
        msg = data["choices"][0]["message"]
        content = msg.get("content", "")
        if isinstance(content, list):  # some gateways return content parts
            return "".join(
                part.get("text", "") for part in content if isinstance(part, dict)
            ).strip()
        return (content or "").strip()
    except (KeyError, IndexError, TypeError):
        return ""


def chat(messages: list[dict], model: str | None = None, **kw) -> str:
    payload = {"model": model or settings.llm_model_chat, "messages": messages, **kw}
    return _extract(_post(payload))


def transcribe(audio_bytes: bytes, fmt: str = "mp3", prompt: str = "Transcribe this audio") -> str:
    audio_b64 = base64.b64encode(audio_bytes).decode("utf-8")
    payload = {
        "model": settings.llm_model_audio,
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {"type": "input_audio", "input_audio": {"data": audio_b64, "format": fmt}},
                ],
            }
        ],
    }
    return _extract(_post(payload))


def image_to_text(
    image_bytes: bytes,
    mime: str = "image/png",
    prompt: str = "Extract all text from this image. Preserve formatting where possible.",
) -> str:
    image_b64 = base64.b64encode(image_bytes).decode("utf-8")
    payload = {
        "model": settings.llm_model_vision,
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {"type": "image_url", "image_url": {"url": f"data:{mime};base64,{image_b64}"}},
                ],
            }
        ],
    }
    return _extract(_post(payload))
