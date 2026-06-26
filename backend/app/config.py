from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Enotik API"
    api_prefix: str = "/api"
    log_level: str = "INFO"
    secret_key: str = "change-me-in-production"
    access_token_expire_minutes: int = 60 * 24
    database_url: str = "postgresql+psycopg://enotik:enotik@db:5432/enotik"
    admin_username: str = "admin"
    admin_password: str = "admin12345"
    cors_origins: str = "http://localhost:3000,http://127.0.0.1:3000"
    media_dir: str = "media"
    media_url: str = "/media"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


settings = Settings()
