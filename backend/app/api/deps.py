from collections.abc import Generator
from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.services.auth_service import AuthService


security = HTTPBearer()


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


def get_current_admin(
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(security)],
) -> None:
    if credentials.scheme.lower() != "bearer":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверный тип авторизации.",
        )

    AuthService.verify_admin_token(credentials.credentials)