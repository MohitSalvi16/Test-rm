"""Text embedding with a graceful offline fallback.

Prefers sentence-transformers when installed. If unavailable (or the model
fails to load), falls back to a deterministic hashing embedder of the same
dimension so the whole system still runs without large downloads.
"""
from __future__ import annotations

import hashlib
import re
from functools import lru_cache

import numpy as np

from .config import settings

_WORD = re.compile(r"\w+", re.UNICODE)


@lru_cache(maxsize=1)
def _st_model():
    try:
        from sentence_transformers import SentenceTransformer

        return SentenceTransformer(settings.embed_model)
    except Exception:
        return None


def _hash_embed(text: str) -> list[float]:
    """Hashing trick: map tokens into a fixed-dim vector, then L2-normalise."""
    dim = settings.embed_dim
    vec = np.zeros(dim, dtype=np.float32)
    for tok in _WORD.findall(text.lower()):
        h = int(hashlib.md5(tok.encode("utf-8")).hexdigest(), 16)
        idx = h % dim
        sign = 1.0 if (h >> 8) % 2 == 0 else -1.0
        vec[idx] += sign
    norm = float(np.linalg.norm(vec))
    if norm > 0:
        vec /= norm
    return vec.tolist()


def embed(text: str) -> list[float]:
    text = (text or "").strip()
    if not text:
        return [0.0] * settings.embed_dim
    model = _st_model()
    if model is not None:
        v = model.encode([text], normalize_embeddings=True)[0]
        return [float(x) for x in v]
    return _hash_embed(text)


def embed_many(texts: list[str]) -> list[list[float]]:
    model = _st_model()
    if model is not None:
        arr = model.encode(texts, normalize_embeddings=True)
        return [[float(x) for x in row] for row in arr]
    return [embed(t) for t in texts]


def using_real_model() -> bool:
    return _st_model() is not None
