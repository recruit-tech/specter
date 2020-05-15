# syntax = docker/dockerfile:experimental
ARG node_version

# Base image
FROM node:${node_version}-buster-slim as node
RUN apt-get update \
    && apt-get install -y locales tzdata busybox \
    && apt-get clean && rm -rf /var/lib/apt/lists/* \
    && echo "# Install Busybox" \
    && mkdir /usr/local/busybox \
    && busybox --install /usr/local/busybox \
    && echo "# Generate locale" \
    && echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen \
    && echo "ja_JP.UTF-8 UTF-8" >> /etc/locale.gen \
    && locale-gen
ENV PATH "$PATH:/usr/local/busybox"
ENV TZ "Asia/Tokyo"
ENV LANG "ja_JP.UTF-8"
ENV LC_ALL "ja_JP.UTF-8"


# Download prod dependencies
FROM node AS prod-deps
WORKDIR /sources
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm install --production


# Download dev dependencies
FROM prod-deps AS deps
WORKDIR /sources
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
RUN --mount=type=cache,target=/root/.npm \
    npm install


# Build
FROM deps AS build
WORKDIR /sources
COPY . ./
WORKDIR /sources
RUN npm run build


# App image
FROM node AS app
WORKDIR /app
COPY --from=prod-deps /sources/ /app/
COPY --from=build /sources/.next/ /app/.next/
COPY --from=build /sources/dist/ /app/dist/
COPY --from=build /sources/public/ /app/public/

# 起動時のログを出力しない
CMD npm run -s production
