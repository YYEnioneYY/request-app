from datetime import datetime
from enum import Enum
from uuid import UUID

from pydantic import BaseModel, Field

from app.models.request import RequestPriority, RequestStatus


class RequestSortBy(str, Enum):
    CREATED_AT = "created_at"
    PRIORITY = "priority"


class SortOrder(str, Enum):
    ASC = "asc"
    DESC = "desc"


class RequestCreate(BaseModel):
    title: str = Field(min_length=3, max_length=120)
    description: str | None = Field(default=None, max_length=1000)
    priority: RequestPriority = RequestPriority.NORMAL


class RequestUpdateStatus(BaseModel):
    status: RequestStatus


class RequestResponse(BaseModel):
    id: UUID
    title: str
    description: str | None
    status: RequestStatus
    priority: RequestPriority
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True,
    }


class RequestListResponse(BaseModel):
    items: list[RequestResponse]
    total: int
    page: int
    size: int
    pages: int