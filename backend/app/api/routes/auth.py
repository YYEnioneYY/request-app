from fastapi import APIRouter, HTTPException, Request, status

from app.core.rate_limiter import login_rate_limiter
from app.schemas.auth import AdminLoginRequest, TokenResponse
from app.services.auth_service import AuthService


router = APIRouter(
    prefix="/auth",
    tags=["Auth"],
)


def get_client_ip(request: Request) -> str:
    if request.client is None:
        return "unknown"

    return request.client.host


@router.post(
    "/login",
    response_model=TokenResponse,
    summary="Вход администратора",
    description="Проверяет дефолтные креды администратора и возвращает JWT-токен.",
)
def login_admin(
    login_data: AdminLoginRequest,
    request: Request,
):
    client_ip = get_client_ip(request)

    login_rate_limiter.check(client_ip)

    try:
        access_token = AuthService.login_admin(
            username=login_data.username,
            password=login_data.password,
        )

    except HTTPException as exc:
        if exc.status_code == status.HTTP_401_UNAUTHORIZED:
            login_rate_limiter.add_failed_attempt(client_ip)

        raise exc

    login_rate_limiter.clear(client_ip)

    return TokenResponse(access_token=access_token)