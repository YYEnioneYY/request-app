from fastapi import APIRouter


router = APIRouter(
    prefix="/health",
    tags=["Health"],
)


@router.get(
    "",
    summary="Проверка API",
    description="Возвращает статус работы backend-приложения.",
)
def health_check():
    return {"status": "ok"}