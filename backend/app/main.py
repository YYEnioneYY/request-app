from fastapi import FastAPI

from app.api.docs import api_description, tags_metadata
from app.api.router import api_router
from app.core.config import settings
from app.core.lifespan import lifespan


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        description=api_description,
        version="1.0.0",
        openapi_tags=tags_metadata,
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json",
        lifespan=lifespan,
    )

    app.include_router(api_router)

    return app


app = create_app()