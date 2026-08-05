# --- Build Stage ---
FROM node:20-slim AS builder

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./

RUN pnpm install --frozen-lockfile

COPY . .

# Declarar y pasar variables de entorno de frontend requeridas durante el build
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

RUN pnpm build

# --- Production Stage ---
FROM node:20-slim AS runner

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public

# Configurar puertos y entorno
ENV PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

CMD ["pnpm", "start"]
