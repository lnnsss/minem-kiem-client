# Build stage
FROM node:20-alpine AS builder

# Ограничиваем Node.js и компиляцию, чтобы не раздуваться > ~300 МБ
ENV NODE_OPTIONS="--max-old-space-size=256"
ENV MAKEFLAGS="-j1"
ENV npm_config_build_from_source=true

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

ARG VITE_CDEK_SERVICE_PATH
ENV VITE_CDEK_SERVICE_PATH=$VITE_CDEK_SERVICE_PATH

ARG VITE_YANDEX_MAPS_API_KEY
ENV VITE_YANDEX_MAPS_API_KEY=$VITE_YANDEX_MAPS_API_KEY

RUN npm run build

# Production stage
FROM nginx:alpine

# Кастомный nginx.conf для SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
