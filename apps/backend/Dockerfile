# syntax=docker/dockerfile:1

# Base stage for dependencies
FROM node:24.13-alpine3.22 AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.28.1 --activate

# Install dependencies for the entire monorepo
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/typescript-config/package.json ./packages/typescript-config/
COPY packages/db/package.json ./packages/db/
COPY apps/backend/package.json ./apps/backend/
RUN pnpm install --frozen-lockfile

# Build shared packages
FROM deps AS build-deps
COPY packages/typescript-config ./packages/typescript-config
COPY packages/db ./packages/db
RUN pnpm --filter @repo/db build

# Build backend
FROM build-deps AS build
COPY apps/backend ./apps/backend
RUN pnpm --filter backend build

# Production stage
FROM node:20-alpine AS production
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.28.1 --activate

COPY --from=build /app/apps/backend/dist ./dist
COPY --from=build /app/apps/backend/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/packages/db/dist ./node_modules/@repo/db/dist
COPY --from=build /app/packages/db/package.json ./node_modules/@repo/db/

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/index.js"]
