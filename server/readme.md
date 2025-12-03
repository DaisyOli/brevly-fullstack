🔗 Brev.ly — API de Encurtador de URLs
Projeto final do curso Pós-Graduação 360º da Rocketseat
Backend desenvolvido em Node.js + Fastify + TypeScript + Drizzle ORM + PostgreSQL

🚀 Sobre o Projeto
O Brev.ly é um encurtador de URLs completo, capaz de:

Criar links encurtados com ou sem shortCode customizado
Registrar e contar cliques
Redirecionar visitantes
Listar todos os links
Excluir links
Exportar os dados em formato CSV
Rodar em modo desenvolvimento, produção e Docker
Este backend segue integralmente as Sprints definidas no desafio da fase final.

📦 Tecnologias Utilizadas
Node.js
Fastify
TypeScript
Drizzle ORM
PostgreSQL
Zod (validação)
Node fs (geração de CSV)
Dockerfile multi-stage
📁 Estrutura de Pastas
server/ ├─ src/ │ ├─ db/ │ ├─ http/ │ │ └─ routes/ │ ├─ server.ts ├─ drizzle/ ├─ dist/ # gerado após build ├─ docs/ # spec OpenAPI ├─ exports/ # arquivos CSV gerados ├─ package.json ├─ Dockerfile ├─ .env └─ .env.example

⚙️ Variáveis de Ambiente
Crie um arquivo .env baseado no .env.example:

DATABASE_URL=postgres://user:password@localhost:5432/brevly
PORT=3333