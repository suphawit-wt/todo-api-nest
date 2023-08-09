# Build stage
FROM node:20.5-slim as builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

# Run stage
FROM node:20.5-slim as runner

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --prod

COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
ENV TYPEORM_ENTITIES "dist/**/*.entity.{ts,js}"
ENV TYPEORM_MIGRATIONS "dist/migrations/*.{ts,js}"

EXPOSE 3000

CMD ["node", "dist/main.js"]