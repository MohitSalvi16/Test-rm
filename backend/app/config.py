from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # LLM gateway (OpenAI-compatible chat completions)
    llm_base_url: str = "https://some-url"
    llm_api_token: str = "test-token"
    llm_model_chat: str = "model-name"
    llm_model_audio: str = "model-name"
    llm_model_vision: str = "model-test"
    llm_verify_ssl: bool = False
    llm_timeout: int = 120

    # pgvector / Postgres
    database_url: str = "postgresql+psycopg://rm:rm@localhost:5433/rmsolver"

    # Embeddings
    embed_model: str = "sentence-transformers/all-MiniLM-L6-v2"
    embed_dim: int = 384


settings = Settings()

# Teams that permanent complaints can be routed to.
PERMANENT_DEPARTMENTS = ["uiux", "tech", "sales", "business", "security"]
# Ingestion sources.
SOURCES = ["linkedin", "google_review", "app_store", "play_store"]
