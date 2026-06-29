# Internal Requests App

Fullstack-приложение для учёта внутренних заявок.

Проект состоит из двух частей:

* `backend` — FastAPI + SQLite;
* `frontend` — React + Vite + TypeScript + Tailwind CSS.

Приложение позволяет создавать внутренние заявки, просматривать список, искать, фильтровать, сортировать, менять статус и удалять заявки через аккаунт администратора.

## Стек

### Backend

* Python
* FastAPI
* SQLAlchemy
* SQLite
* Pydantic
* JWT
* Swagger

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Feature-Sliced Design

### Инфраструктура

* Docker
* Docker Compose

## Возможности

* Создание заявки.
* Просмотр списка заявок.
* Поиск по названию и описанию.
* Фильтрация по статусу и приоритету.
* Сортировка по дате создания и приоритету.
* Пагинация списка.
* Изменение статуса заявки.
* Вход администратора.
* Удаление заявки только администратором.
* Обработка ошибок API на frontend.
* Loading state.
* Empty state.
* Страница 404.
* Swagger-документация backend API.

## Бизнес-правила

* Заявку в статусе `done` нельзя редактировать.
* Заявку в статусе `done` нельзя удалить.
* Заявку нельзя перевести из `done` обратно в другой статус.
* Удаление заявок доступно только администратору.
* Обычные пользователи работают с заявками без регистрации.
* Администратор нужен только для удаления заявок.

## Дефолтный аккаунт администратора

```text
username: admin
password: admin
```

После входа frontend сохраняет JWT-токен администратора и использует его для удаления заявок.


## Переменные окружения

Для запуска через Docker Compose используется `.env` в корне проекта.

Создайте файл `.env` в корне проекта:

```bash
cp .env.example .env
```

Или создайте файл вручную:

```env
# Backend
APP_NAME="Internal Requests API"
DATABASE_URL=sqlite:////app/data/app.db

ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin

JWT_SECRET_KEY=change_this_secret_key
JWT_ALGORITHM=HS256

CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173

LOGIN_RATE_LIMIT_ATTEMPTS=5
LOGIN_RATE_LIMIT_SECONDS=60

ENABLE_DOCS=true

# Frontend
VITE_API_BASE_URL=http://localhost:8000
```

## Описание переменных окружения

### Backend

| Переменная                  | Описание                                                                        |
| --------------------------- | ------------------------------------------------------------------------------- |
| `APP_NAME`                  | Название backend-приложения. Отображается в Swagger.                            |
| `DATABASE_URL`              | Строка подключения к базе данных. Для Docker используется SQLite внутри volume. |
| `ADMIN_USERNAME`            | Логин администратора.                                                           |
| `ADMIN_PASSWORD`            | Пароль администратора.                                                          |
| `JWT_SECRET_KEY`            | Секретный ключ для подписи JWT-токенов.                                         |
| `JWT_ALGORITHM`             | Алгоритм подписи JWT. По умолчанию используется `HS256`.                        |
| `CORS_ORIGINS`              | Список адресов frontend, которым разрешено обращаться к backend.                |
| `LOGIN_RATE_LIMIT_ATTEMPTS` | Максимальное количество неудачных попыток входа.                                |
| `LOGIN_RATE_LIMIT_SECONDS`  | Временное окно для ограничения попыток входа в секундах.                        |
| `ENABLE_DOCS`               | Включает или отключает Swagger и OpenAPI-документацию.                          |

### Frontend

| Переменная          | Описание                                           |
| ------------------- | -------------------------------------------------- |
| `VITE_API_BASE_URL` | Адрес backend API, к которому обращается frontend. |

## Запуск через Docker Compose

Самый простой способ запуска — через Docker Compose.

Из корня проекта выполните:

```bash
docker compose up --build
```

После запуска будут доступны:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:8000
Swagger:  http://localhost:8000/docs
ReDoc:    http://localhost:8000/redoc
```

Остановить контейнеры:

```bash
docker compose down
```

Остановить контейнеры и удалить volume с SQLite-данными:

```bash
docker compose down -v
```

## Локальный запуск без Docker

Можно запускать backend и frontend отдельно.

### 1. Backend

Перейдите в папку backend:

```bash
cd backend
```

Создайте виртуальное окружение:

```bash
python -m venv .venv
```

Активируйте виртуальное окружение.

Windows:

```bash
.venv\Scripts\activate
```

macOS / Linux:

```bash
source .venv/bin/activate
```

Установите зависимости:

```bash
pip install -r requirements.txt
```

Создайте файл `backend/.env`:

```env
APP_NAME="Internal Requests API"
DATABASE_URL=sqlite:///./app.db

ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin

JWT_SECRET_KEY=change_this_secret_key
JWT_ALGORITHM=HS256

CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173

LOGIN_RATE_LIMIT_ATTEMPTS=5
LOGIN_RATE_LIMIT_SECONDS=60

ENABLE_DOCS=true
```

Запустите backend:

```bash
python -m uvicorn app.main:app --reload
```

Backend будет доступен по адресу:

```text
http://localhost:8000
```

Swagger:

```text
http://localhost:8000/docs
```

### 2. Frontend

В отдельном терминале перейдите в папку frontend:

```bash
cd frontend
```

Установите зависимости:

```bash
npm install
```

Создайте файл `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Запустите frontend:

```bash
npm run dev
```

Frontend будет доступен по адресу:

```text
http://localhost:5173
```