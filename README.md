# Enotik

Этап 1: перевод существующего React-сайта на управляемый контент через `FastAPI + PostgreSQL + Docker`.

## Что сделано

- добавлен backend на `FastAPI`
- добавлена авторизация администратора по JWT
- добавлена админ-панель по маршруту `/admin`
- весь основной контент сайта теперь читается из БД
- добавлены CRUD-операции для:
  - продуктов
  - меню
  - блоков главной страницы
  - галереи
  - отзывов
  - общих настроек сайта
- добавлена загрузка изображений
- добавлен `docker-compose` для `frontend + backend + postgres`

## Структура

- `src/` — React-фронтенд и встроенная админка
- `backend/` — API на FastAPI
- `docker-compose.yml` — полный стек для сервера
- `docker/nginx/default.conf` — nginx для фронтенда и проксирования `/api` и `/media`

## Локальный запуск через Docker

```bash
docker compose up --build
```

После запуска:

- сайт: `http://localhost`
- API: `http://localhost/api/content`
- админка: `http://localhost/admin`

## Дефолтные доступы

- логин: `admin`
- пароль: `admin12345`

Перед продакшеном обязательно поменять:

- `backend/.env`
- `SECRET_KEY`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- пароль PostgreSQL в `docker-compose.yml`

## Локальный запуск без Docker

### Frontend

```bash
npm install
npm start
```

### Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Нужно отдельно поднять PostgreSQL и прописать `DATABASE_URL` в `backend/.env`.

## Что редактируется через админку

- название сайта
- hero-блок на главной
- логотип
- тексты футера
- соцссылки
- продукты всех категорий
- ссылки на продукты
- изображения продуктов
- блоки главной страницы
- галерея логотипов
- отзывы
- меню сайта

## Проверка

Проверено:

- `docker compose config`
- production build React
- синтаксическая проверка backend через `python3 -m compileall`
