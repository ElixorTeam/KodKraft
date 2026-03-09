FROM oven/bun:1.3-alpine AS base

ARG PUBLIC_API_URL
ARG APP_NAME=web

ENV PUBLIC_API_URL=$PUBLIC_API_URL
ENV TURBO_TELEMETRY_DISABLED=1

FROM base AS prune

WORKDIR /app
COPY . .
RUN bunx turbo@latest prune ${APP_NAME} --docker

FROM base AS build

WORKDIR /app
COPY --from=prune /app/out/json/ .
COPY --from=prune /app/out/bun.lock .
RUN bun install --frozen-lockfile

COPY --from=prune /app/out/full/ .
RUN bun --bun run turbo build --filter=${APP_NAME}

FROM httpd:2.4-alpine AS runtime

WORKDIR /app

COPY --from=build /app/apps/web/dist /usr/local/apache2/htdocs/

EXPOSE 80
