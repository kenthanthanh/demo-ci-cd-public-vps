# -------------------------------------------
# Stage 1: Build
# -------------------------------------------
FROM node:22-alpine AS build

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app
RUN chown appuser:appgroup /app

USER appuser

COPY --chown=appuser:appgroup package.json package-lock.json* ./
RUN npm ci

COPY --chown=appuser:appgroup . .

ARG VITE_API_URL=/api/v1
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# -------------------------------------------
# Stage 2: Serve with Caddy
# -------------------------------------------
FROM caddy:2-alpine

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv

EXPOSE 3000
