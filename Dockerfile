# Docs on Dokploy: the static Docusaurus build plus server.mjs, which also serves the support form endpoint.
FROM node:22-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
# No install scripts: the only one that matters is optipng-bin, used by the local compress-images script, not the build.
RUN npm ci --ignore-scripts
COPY . .
# The Turnstile site key is public and inlined into the bundle at build time, so it is a build arg.
ARG TURNSTILE_SITE_KEY
ENV TURNSTILE_SITE_KEY=$TURNSTILE_SITE_KEY
RUN npm run build

# Only the node binary: the server has no dependencies, so npm and node_modules stay out of the image.
FROM debian:bookworm-slim
# Node ships its own CA bundle, so the outgoing HTTPS calls (Turnstile, Resend) need no ca-certificates package.
RUN groupadd --gid 1000 node && useradd --uid 1000 --gid node --create-home node
COPY --from=build /usr/local/bin/node /usr/local/bin/node
WORKDIR /app
ENV NODE_ENV=production PORT=3000
COPY --from=build --chown=node:node /app/build ./build
COPY --chown=node:node server.mjs package.json ./
COPY --chown=node:node api ./api
USER node
EXPOSE 3000
CMD ["node", "server.mjs"]
