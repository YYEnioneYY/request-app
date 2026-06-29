from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError

from app.api.exception_handlers import validation_exception_handler

from app.api.docs import api_description, tags_metadata
from app.api.router import api_router
from app.core.config import settings
from app.core.lifespan import lifespan
from app.core.cors import setup_cors


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        description=api_description,
        version="1.0.0",
        openapi_tags=tags_metadata,
        docs_url="/docs" if settings.ENABLE_DOCS else None,
        redoc_url="/redoc" if settings.ENABLE_DOCS else None,
        openapi_url="/openapi.json" if settings.ENABLE_DOCS else None,
        lifespan=lifespan,
    )

    setup_cors(app)

    app.add_exception_handler(
        RequestValidationError,
        validation_exception_handler,
    )

    app.include_router(api_router)

    return app


app = create_app()