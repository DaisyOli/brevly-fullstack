import "dotenv/config";
import fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import path from 'path';
import fs from 'fs';
import { createLinkRoute } from './http/routes/create-link';
import { listLinksRoute } from './http/routes/list-links';
import { redirectLinkRoute } from './http/routes/redirect-link';
import { deleteLinkRoute } from './http/routes/delete-link';
import { exportLinksRoute } from './http/routes/export-links';
import fastifyCors from '@fastify/cors';


const app = fastify();

//habilitar o cors
app.register(fastifyCors, {
  origin: true,
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
});

//carregar spec.yml
const specPath = path.join(__dirname, '..','docs', 'spec.yaml');
const openapi = fs.readFileSync(specPath, 'utf-8');

//registrar o swagger
app.register(swagger, {
  mode: 'static',
  specification: {
    path: specPath,
    baseDir: path.join(__dirname, '..'),
  },
});

// registrar o swagger-ui
app.register(swaggerUi, {
  routePrefix: '/docs',
  staticCSP: true,
});

// rota de health 

app.get('/health', async () => {
  return { status: 'Tudo ok' };
})

// registrar a rota de criação de link
app.register(createLinkRoute);

//rota de listagem de links
app.register(listLinksRoute);

//rota para redirecionar o link
app.register(redirectLinkRoute);

//rota para deletar o link
app.register(deleteLinkRoute);

//rota para exportar links
app.register(exportLinksRoute);

const port = Number(process.env.PORT) || 3333;

app
  .listen({ port, host: "0.0.0.0" })
  .then(() => {
    console.log(`HTTP server running on http://localhost:${port}`);
  })
  .catch((err) => {
    console.error("Erro ao iniciar o servidor:", err);
    process.exit(1);
  });