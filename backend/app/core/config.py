from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "Internal Requests API"

    DATABASE_URL: str = "sqlite:///./app.db"

    ADMIN_USERNAME: str = "example"
    ADMIN_PASSWORD: str = "example_pass"

    JWT_SECRET_KEY: str = "change_this_secret_key"
    JWT_ALGORITHM: str = "HS256"

    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()