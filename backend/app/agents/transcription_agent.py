"""Agent 2 — Transcription.

When an RM receives a customer call, turn the audio into text. Also OCR any
attached screenshots. Both go through the gateway client.
"""
from __future__ import annotations

from .. import llm


def transcribe_call(audio_bytes: bytes, fmt: str = "mp3") -> str:
    return llm.transcribe(audio_bytes, fmt=fmt)


def read_screenshots(images: list[tuple[bytes, str]]) -> str:
    """images: list of (bytes, mime). Returns concatenated extracted text."""
    chunks = []
    for idx, (img, mime) in enumerate(images, 1):
        text = llm.image_to_text(img, mime=mime)
        if text:
            chunks.append(f"[screenshot {idx}]\n{text}")
    return "\n\n".join(chunks)
