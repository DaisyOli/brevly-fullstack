# Etapa 1: build
FROM node:20-alpine AS build

WORKDIR /app

# Habilitar pnpm via corepack
RUN corepack enable

# Copiar arquivos de config e dependências
COPY package.json pnpm-lock.yaml tsconfig.json drizzle.config.ts ./
COPY src ./src
COPY drizzle ./drizzle
COPY docs ./docs

# Instalar dependências (com cache do pnpm-lock.yaml)
RUN pnpm install --frozen-lockfile

# Build do TypeScript
RUN pnpm build

# Etapa 2: imagem final de produção
FROM node:20-alpine AS prod

WORKDIR /app

RUN corepack enable

# Copiar apenas o necessário da etapa de build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./
COPY --from=build /app/docs ./docs 

ENV NODE_ENV=production
ENV PORT=3333

EXPOSE 3333

CMD ["node", "dist/server.js"]
