from sqlalchemy import asc, case, desc, func, or_, select
from sqlalchemy.orm import Session

from app.models.request import RequestModel, RequestPriority, RequestStatus
from app.schemas.request import RequestSortBy, SortOrder


class RequestRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        title: str,
        description: str | None,
        priority: RequestPriority,
    ) -> RequestModel:
        request = RequestModel(
            title=title,
            description=description,
            priority=priority,
        )

        self.db.add(request)
        self.db.commit()
        self.db.refresh(request)

        return request

    def get_by_id(self, request_id: str) -> RequestModel | None:
        query = select(RequestModel).where(RequestModel.id == request_id)

        return self.db.scalar(query)

    def get_list(
        self,
        search: str | None,
        status_filter: RequestStatus | None,
        priority_filter: RequestPriority | None,
        sort_by: RequestSortBy,
        order: SortOrder,
        page: int,
        size: int,
    ) -> tuple[list[RequestModel], int]:
        query = select(RequestModel)

        if status_filter is not None:
            query = query.where(RequestModel.status == status_filter)

        if priority_filter is not None:
            query = query.where(RequestModel.priority == priority_filter)

        if search:
            search_pattern = f"%{search}%"

            query = query.where(
                or_(
                    RequestModel.title.ilike(search_pattern),
                    RequestModel.description.ilike(search_pattern),
                )
            )

        total = self._count(query)

        query = self._apply_sorting(
            query=query,
            sort_by=sort_by,
            order=order,
        )

        offset = (page - 1) * size

        query = query.offset(offset).limit(size)

        requests = self.db.scalars(query).all()

        return list(requests), total

    def update_status(
        self,
        request: RequestModel,
        new_status: RequestStatus,
    ) -> RequestModel:
        request.status = new_status

        self.db.commit()
        self.db.refresh(request)

        return request

    def _count(self, query) -> int:
        count_query = select(func.count()).select_from(query.subquery())

        return self.db.scalar(count_query) or 0

    def _apply_sorting(
        self,
        query,
        sort_by: RequestSortBy,
        order: SortOrder,
    ):
        if sort_by == RequestSortBy.CREATED_AT:
            sort_expression = RequestModel.created_at
        else:
            sort_expression = case(
                (RequestModel.priority == RequestPriority.LOW, 1),
                (RequestModel.priority == RequestPriority.NORMAL, 2),
                (RequestModel.priority == RequestPriority.HIGH, 3),
                else_=0,
            )

        if order == SortOrder.ASC:
            return query.order_by(asc(sort_expression))

        return query.order_by(desc(sort_expression))
    
    def delete(self, request: RequestModel) -> None:
        self.db.delete(request)
        self.db.commit()