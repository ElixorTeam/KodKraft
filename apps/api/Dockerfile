FROM oven/bun:1.3-alpine AS base

ARG TELEGRAM_BOT_TOKEN
ARG TELEGRAM_CHAT_ID
ARG FRONTEND_URL
ARG APP_NAME=api

ENV TELEGRAM_BOT_TOKEN=$TELEGRAM_BOT_TOKEN
ENV TELEGRAM_CHAT_ID=$TELEGRAM_CHAT_ID
ENV FRONTEND_URL=$FRONTEND_URL

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

FROM base AS runtime
WORKDIR /app

COPY --from=build /app/apps/${APP_NAME}/dist ./

EXPOSE 3000
CMD ["bun", "run", "index.js"]
