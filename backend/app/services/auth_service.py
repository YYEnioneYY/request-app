from datetime import datetime, timedelta, timezone

from fastapi import HTTPException, status
from jose import JWTError, jwt

from app.core.config import settings


class AuthService:
    @staticmethod
    def login_admin(username: str, password: str) -> str:
        if username != settings.ADMIN_USERNAME or password != settings.ADMIN_PASSWORD:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Неверный логин или пароль.",
            )

        return AuthService.create_access_token()

    @staticmethod
    def create_access_token() -> str:
        expire = datetime.now(timezone.utc) + timedelta(hours=12)

        payload = {
            "sub": settings.ADMIN_USERNAME,
            "role": "admin",
            "exp": expire,
        }

        return jwt.encode(
            payload,
            settings.JWT_SECRET_KEY,
            algorithm=settings.JWT_ALGORITHM,
        )

    @staticmethod
    def verify_admin_token(token: str) -> None:
        try:
            payload = jwt.decode(
                token,
                settings.JWT_SECRET_KEY,
                algorithms=[settings.JWT_ALGORITHM],
            )

            role = payload.get("role")

            if role != "admin":
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Недостаточно прав.",
                )

        except JWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Недействительный или истёкший токен.",
            )