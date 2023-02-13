FROM node:18 as builder

WORKDIR /app

COPY package.json package-lock.json tsconfig.json tsconfig.build.json ./

RUN npm ci

COPY src/ ./src

RUN npm run build

FROM node:18.12.1-slim as app

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY --from=builder ./app/dist/ ./dist/

ENTRYPOINT ["node", "./dist/src/main.js"]

