# syntax=docker/dockerfile:1

# Base stage for dependencies
FROM node:24.13-alpine3.22 AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.28.1 --activate

# Install dependencies for the entire monorepo
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/typescript-config/package.json ./packages/typescript-config/
COPY packages/ui/package.json ./packages/ui/
COPY apps/frontend/package.json ./apps/frontend/
RUN pnpm install --frozen-lockfile

# Build shared packages
FROM deps AS build-deps
COPY packages/typescript-config ./packages/typescript-config
COPY packages/ui ./packages/ui
RUN pnpm --filter @repo/ui check-types || true

# Build frontend
FROM build-deps AS build
COPY apps/frontend ./apps/frontend
RUN pnpm --filter frontend build

# Production stage with nginx
FROM nginx:alpine AS production
COPY --from=build /app/apps/frontend/dist /usr/share/nginx/html
COPY apps/frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
