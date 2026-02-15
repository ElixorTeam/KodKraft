FROM oven/bun:1.3-alpine AS base

FROM base AS build

WORKDIR /app
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile --ignore-scripts

COPY . .
RUN bun run build

FROM base AS runtime
WORKDIR /app
COPY --from=build /app/dist ./

EXPOSE 3000
CMD ["bun", "run", "index.js"]
