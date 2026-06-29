from fastapi import Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse


FIELD_NAMES = {
    "title": "title",
    "description": "description",
    "status": "status",
    "priority": "priority",
    "request_id": "request_id",
    "search": "search",
    "sort_by": "sort_by",
    "order": "order",
    "page": "page",
    "size": "size",
}


ALLOWED_VALUES = {
    "status": "new, in_progress, done",
    "priority": "low, normal, high",
    "sort_by": "created_at, priority",
    "order": "asc, desc",
}


def get_error_message(error: dict) -> str:
    location = error.get("loc", [])
    field = str(location[-1]) if location else "field"
    field_name = FIELD_NAMES.get(field, field)

    error_type = error.get("type")
    context = error.get("ctx") or {}

    if error_type == "missing":
        return f"Поле {field_name} обязательно."

    if error_type == "string_too_short":
        min_length = context.get("min_length")
        return f"Поле {field_name} должно содержать минимум {min_length} символа."

    if error_type == "string_too_long":
        max_length = context.get("max_length")
        return f"Поле {field_name} должно содержать максимум {max_length} символов."

    if error_type == "enum":
        allowed_values = ALLOWED_VALUES.get(field)

        if allowed_values:
            return f"Поле {field_name} имеет недопустимое значение. Допустимые значения: {allowed_values}."

        return f"Поле {field_name} имеет недопустимое значение."

    if error_type == "uuid_parsing":
        return f"Поле {field_name} должно быть корректным UUID."

    if error_type in {"int_parsing", "greater_than_equal", "less_than_equal"}:
        return f"Поле {field_name} имеет некорректное числовое значение."

    return f"Поле {field_name} заполнено некорректно."


async def validation_exception_handler(
    request: Request,
    exc: RequestValidationError,
):
    messages = [
        get_error_message(error)
        for error in exc.errors()
    ]

    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "detail": " ".join(messages),
        },
    )