FROM node:23-alpine AS base

# Enable Corepack and activate pnpm
# ref: https://pnpm.io/docker
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder

# Ensure requirements are met using alpine image
# ref: https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm add -g turbo
COPY . .

RUN turbo prune seeder --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
 
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY --from=builder /app/out/json/ .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Build dependencies
COPY --from=builder /app/out/full/ .
RUN pnpm build

FROM base AS runner

COPY --from=installer /app /app
WORKDIR /app/packages/seeder

CMD ["pnpm", "db:seed"]
