from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, DeclarativeBase

from .config import settings

engine = create_engine(settings.database_url, pool_pre_ping=True, future=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


def init_db() -> None:
    """Enable pgvector and create tables. Idempotent."""
    # Import models so they register on Base.metadata before create_all.
    from . import models  # noqa: F401

    with engine.begin() as conn:
        conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector"))
    Base.metadata.create_all(engine)


def get_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
