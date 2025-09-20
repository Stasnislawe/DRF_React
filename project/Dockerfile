FROM python:3.11-slim-bullseye

# Установка системных зависимостей
RUN apt-get update && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Установка зависимостей Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копирование кода приложения
COPY . .

# Создание статической папки (если нужно)
RUN mkdir -p static

# Запуск миграций и сервера
CMD python manage.py migrate && \
    python manage.py runserver 0.0.0.0:8000