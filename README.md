# Internal Requests App

Небольшое fullstack-приложение для учёта внутренних заявок.

Проект выполняется в рамках тестового задания на позицию Fullstack-разработчика.
Backend реализуется на FastAPI, frontend планируется на React + TypeScript.

## Стек

### Backend

* Python
* FastAPI
* SQLAlchemy
* SQLite
* Pydantic
* JWT для авторизации администратора

### Frontend

* React
* TypeScript

Frontend-часть будет добавлена позже.

## Что уже реализовано

На текущем этапе реализован backend.

### Общая структура backend

Backend разделён по слоям:

* `api` — HTTP-роуты;
* `schemas` — Pydantic-схемы запросов и ответов;
* `models` — SQLAlchemy-модели;
* `repositories` — работа с базой данных;
* `services` — бизнес-логика;
* `core` — настройки приложения, Swagger и lifecycle;
* `db` — подключение к базе данных.

### Реализованные возможности

* создание заявки;
* получение списка заявок;
* поиск по названию и описанию;
* фильтрация по статусу;
* фильтрация по приоритету;
* сортировка по дате создания;
* сортировка по приоритету;
* пагинация списка;
* изменение статуса заявки;
* вход администратора;
* удаление заявки только администратором;
* Swagger-документация;
* health-check endpoint.

## Модель заявки

Заявка содержит поля:

* `id` — уникальный UUID;
* `title` — название заявки;
* `description` — описание заявки;
* `status` — статус заявки;
* `priority` — приоритет заявки;
* `created_at` — дата и время создания;
* `updated_at` — дата и время последнего обновления.

### Возможные статусы

* `new`
* `in_progress`
* `done`

### Возможные приоритеты

* `low`
* `normal`
* `high`

## Бизнес-правила

В проекте реализованы следующие бизнес-правила:

* заявку в статусе `done` нельзя редактировать;
* заявку в статусе `done` нельзя удалить;
* заявку нельзя перевести из `done` обратно в другой статус;
* удаление заявки доступно только администратору;
* при нарушении бизнес-правил API возвращает понятный HTTP-ответ с сообщением об ошибке.

## Авторизация администратора

В проекте есть дефолтный админский аккаунт:

```text
username: admin
password: admin
```

Администратор нужен только для удаления заявок.

После входа администратор получает JWT-токен, который используется для доступа к защищённому endpoint удаления заявки.

## API endpoints

### Health

```http
GET /health
```

Проверка работоспособности API.

### Auth

```http
POST /auth/login
```

Вход администратора.

Пример тела запроса:

```json
{
  "username": "admin",
  "password": "admin"
}
```

### Requests

```http
POST /requests
```

Создание заявки.

```http
GET /requests
```

Получение списка заявок с поиском, фильтрацией, сортировкой и пагинацией.

Поддерживаемые query-параметры:

* `search`
* `status`
* `priority`
* `sort_by`
* `order`
* `page`
* `size`

```http
PATCH /requests/{request_id}/status
```

Изменение статуса заявки.

```http
DELETE /requests/{request_id}
```

Удаление заявки.
Доступно только администратору.

## Запуск backend

Перейти в папку backend:

```bash
cd backend
```

Создать виртуальное окружение:

```bash
python -m venv .venv
```

Активировать виртуальное окружение на Windows:

```bash
.venv\Scripts\activate
```

Установить зависимости:

```bash
pip install -r requirements.txt
```

Создать файл `.env` в папке `backend`:

```env
APP_NAME=Internal Requests API
DATABASE_URL=sqlite:///./app.db

ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin

JWT_SECRET_KEY=change_this_secret_key
JWT_ALGORITHM=HS256
```

Запустить backend:

```bash
python -m uvicorn app.main:app --reload
```

После запуска API будет доступно по адресу:

```text
http://127.0.0.1:8000
```

Swagger-документация:

```text
http://127.0.0.1:8000/docs
```

ReDoc:

```text
http://127.0.0.1:8000/redoc
```

## Текущий статус проекта

Backend находится в рабочем состоянии.

Frontend-часть будет реализована следующим этапом.
