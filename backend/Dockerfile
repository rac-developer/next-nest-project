# --- Build Stage ---
FROM node:20-slim AS builder

# Instalar dependencias necesarias para compilar módulos nativos (como better-sqlite3)
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# Configurar pnpm
RUN npm install -g pnpm

WORKDIR /usr/src/app

# Copiar archivos de configuración de dependencias
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./
COPY prisma ./prisma/

# Instalar todas las dependencias
RUN pnpm install --frozen-lockfile

# Copiar el resto del código
COPY . .

# Generar el cliente de Prisma
RUN pnpm prisma generate

# Compilar la aplicación NestJS
RUN pnpm build

# --- Production Stage ---
FROM node:20-slim AS runner

# Instalar dependencias del sistema requeridas en runtime (como openssl para Prisma)
RUN apt-get update && apt-get install -y \
    openssl \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g pnpm

WORKDIR /usr/src/app

# Copiar archivos generados y dependencias necesarias desde el builder
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma
COPY --from=builder /usr/src/app/prisma.config.js ./prisma.config.js

# Definir variables de entorno por defecto
ENV PORT=4000
ENV NODE_ENV=production

EXPOSE 4000

# Ejecutar las migraciones pendientes y levantar el servidor
CMD pnpm prisma migrate deploy && node dist/main
