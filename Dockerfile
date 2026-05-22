FROM node:22-alpine AS base
WORKDIR /usr/src/app
EXPOSE 3000

FROM base AS builder
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build 

FROM base AS production
ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /usr/src/app/dist ./dist

CMD ["node", "dist/index.js"]