from fastapi import APIRouter

from app.schemas.auth import AdminLoginRequest, TokenResponse
from app.services.auth_service import AuthService


router = APIRouter(
    prefix="/auth",
    tags=["Auth"],
)


@router.post(
    "/login",
    response_model=TokenResponse,
    summary="Вход администратора",
    description="Проверяет дефолтные креды администратора и возвращает JWT-токен.",
)
def login_admin(login_data: AdminLoginRequest):
    access_token = AuthService.login_admin(
        username=login_data.username,
        password=login_data.password,
    )

    return TokenResponse(access_token=access_token)