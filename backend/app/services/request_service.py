from math import ceil

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.request import RequestPriority, RequestStatus
from app.repositories.request_repository import RequestRepository
from app.schemas.request import (
    RequestCreate,
    RequestListResponse,
    RequestSortBy,
    RequestUpdateStatus,
    SortOrder,
)


class RequestService:
    def __init__(self, db: Session):
        self.repository = RequestRepository(db)

    def create_request(self, request_data: RequestCreate):
        return self.repository.create(
            title=request_data.title,
            description=request_data.description,
            status=request_data.status,
            priority=request_data.priority,
        )

    def get_requests(
        self,
        search: str | None,
        status_filter: RequestStatus | None,
        priority_filter: RequestPriority | None,
        sort_by: RequestSortBy,
        order: SortOrder,
        page: int,
        size: int,
    ) -> RequestListResponse:
        requests, total = self.repository.get_list(
            search=search,
            status_filter=status_filter,
            priority_filter=priority_filter,
            sort_by=sort_by,
            order=order,
            page=page,
            size=size,
        )

        pages = ceil(total / size) if total > 0 else 0

        return RequestListResponse(
            items=requests,
            total=total,
            page=page,
            size=size,
            pages=pages,
        )

    def update_request_status(
        self,
        request_id: str,
        request_data: RequestUpdateStatus,
    ):
        request = self.repository.get_by_id(request_id)

        if request is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Заявка не найдена.",
            )

        if request.status == RequestStatus.DONE:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Заявку в статусе done нельзя редактировать или переводить обратно в другой статус.",
            )

        return self.repository.update_status(
            request=request,
            new_status=request_data.status,
        )
    
    def delete_request(self, request_id: str) -> None:
        request = self.repository.get_by_id(request_id)

        if request is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Заявка не найдена.",
            )

        if request.status == RequestStatus.DONE:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Заявку в статусе done нельзя удалить.",
            )

        self.repository.delete(request)