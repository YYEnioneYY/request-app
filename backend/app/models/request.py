from datetime import datetime, timezone
from enum import Enum
from uuid import uuid4

from sqlalchemy import DateTime, Enum as SQLAlchemyEnum, String
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class RequestStatus(str, Enum):
    NEW = "new"
    IN_PROGRESS = "in_progress"
    DONE = "done"


class RequestPriority(str, Enum):
    LOW = "low"
    NORMAL = "normal"
    HIGH = "high"


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


class RequestModel(Base):
    __tablename__ = "requests"

    id: Mapped[str] = mapped_column(
        String(36),
        primary_key=True,
        default=lambda: str(uuid4()),
        index=True,
    )

    title: Mapped[str] = mapped_column(String(120), nullable=False)

    description: Mapped[str | None] = mapped_column(
        String(1000),
        nullable=True,
    )

    status: Mapped[RequestStatus] = mapped_column(
        SQLAlchemyEnum(
            RequestStatus,
            values_callable=lambda enum: [item.value for item in enum],
            native_enum=False,
        ),
        default=RequestStatus.NEW,
        nullable=False,
    )

    priority: Mapped[RequestPriority] = mapped_column(
        SQLAlchemyEnum(
            RequestPriority,
            values_callable=lambda enum: [item.value for item in enum],
            native_enum=False,
        ),
        default=RequestPriority.NORMAL,
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=utc_now,
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=utc_now,
        onupdate=utc_now,
        nullable=False,
    )