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
RUN turbo prune web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer

# Enable remote caching. Hidden in final build because of multi-stage builds.
# ref: https://turborepo.com/docs/guides/tools/docker#remote-caching
ARG TURBO_TEAM
ARG TURBO_TOKEN
ARG OPENAI_API_KEY
ARG PINECONE_API_KEY
ARG PINECONE_INDEX_NAME

ENV TURBO_TEAM=${TURBO_TEAM}
ENV TURBO_TOKEN=${TURBO_TOKEN}
ENV OPENAI_API_KEY=${OPENAI_API_KEY}
ENV PINECONE_API_KEY=${PINECONE_API_KEY}
ENV PINECONE_INDEX_NAME=${PINECONE_INDEX_NAME}
 
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY --from=builder /app/out/json/ .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Build the project
COPY --from=builder /app/out/full/ .
RUN pnpm build

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Automatically leverage output traces to reduce image size
# ref: https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

CMD ["node", "apps/web/server.js"]
