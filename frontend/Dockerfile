FROM node:18-alpine

WORKDIR /app

# Копируем зависимости и устанавливаем их
COPY package*.json ./
RUN npm install

# Копируем исходный код
COPY . .

# Используем dev server с явным указанием хоста и порта
CMD npm run dev -- --host 0.0.0.0 --port 3000