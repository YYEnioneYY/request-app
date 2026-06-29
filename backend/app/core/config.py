from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "Internal Requests API"

    DATABASE_URL: str = "sqlite:///./app.db"

    ADMIN_USERNAME: str = "example"
    ADMIN_PASSWORD: str = "example_pass"

    JWT_SECRET_KEY: str = "change_this_secret_key"
    JWT_ALGORITHM: str = "HS256"

    LOGIN_RATE_LIMIT_ATTEMPTS: int = 5
    LOGIN_RATE_LIMIT_SECONDS: int = 60

    CORS_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173"

    ENABLE_DOCS: bool = True

    model_config = SettingsConfigDict(env_file=".env")

    @property
    def cors_origins_list(self) -> list[str]:
        return [
            origin.strip()
            for origin in self.CORS_ORIGINS.split(",")
            if origin.strip()
        ]


settings = Settings()