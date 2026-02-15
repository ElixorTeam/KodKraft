FROM oven/bun:1.3-alpine AS build

WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile --ignore-scripts

COPY . .
RUN bun --bun run build

FROM httpd:2.4-alpine AS runtime

WORKDIR /app

COPY --from=build /app/dist /usr/local/apache2/htdocs/

EXPOSE 80
