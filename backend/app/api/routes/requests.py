from typing import Annotated
from uuid import UUID

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.models.request import RequestPriority, RequestStatus
from app.schemas.request import (
    RequestCreate,
    RequestListResponse,
    RequestResponse,
    RequestSortBy,
    RequestUpdateStatus,
    SortOrder,
)
from app.services.request_service import RequestService

from app.api.deps import get_current_admin, get_db


router = APIRouter(
    prefix="/requests",
    tags=["Requests"],
)


@router.post(
    "",
    response_model=RequestResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Создать заявку",
    description="Создаёт новую внутреннюю заявку.",
)
def create_request(
    request_data: RequestCreate,
    db: Annotated[Session, Depends(get_db)],
):
    service = RequestService(db)

    return service.create_request(request_data)


@router.get(
    "",
    response_model=RequestListResponse,
    summary="Получить список заявок",
    description="Возвращает список заявок с поиском, фильтрацией, сортировкой и пагинацией.",
)
def get_requests(
    db: Annotated[Session, Depends(get_db)],
    search: Annotated[str | None, Query(max_length=120)] = None,
    status_filter: Annotated[RequestStatus | None, Query(alias="status")] = None,
    priority_filter: Annotated[RequestPriority | None, Query(alias="priority")] = None,
    sort_by: RequestSortBy = RequestSortBy.CREATED_AT,
    order: SortOrder = SortOrder.DESC,
    page: Annotated[int, Query(ge=1)] = 1,
    size: Annotated[int, Query(ge=1, le=100)] = 10,
):
    service = RequestService(db)

    return service.get_requests(
        search=search,
        status_filter=status_filter,
        priority_filter=priority_filter,
        sort_by=sort_by,
        order=order,
        page=page,
        size=size,
    )


@router.patch(
    "/{request_id}/status",
    response_model=RequestResponse,
    summary="Изменить статус заявки",
    description="Изменяет статус заявки. Заявку в статусе done нельзя редактировать.",
)
def update_request_status(
    request_id: UUID,
    request_data: RequestUpdateStatus,
    db: Annotated[Session, Depends(get_db)],
):
    service = RequestService(db)

    return service.update_request_status(
        request_id=str(request_id),
        request_data=request_data,
    )

@router.delete(
    "/{request_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Удалить заявку",
    description="Удаляет заявку. Доступно только администратору. Заявку в статусе done удалить нельзя.",
)
def delete_request(
    request_id: UUID,
    db: Annotated[Session, Depends(get_db)],
    _: Annotated[None, Depends(get_current_admin)],
):
    service = RequestService(db)

    service.delete_request(str(request_id))