from contextlib import asynccontextmanager

from fastapi import FastAPI

from app import models  # noqa: F401
from app.db.base import Base
from app.db.database import engine


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield