import fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import path from 'path';
import fs from 'fs';
import { createLinkRoute } from './http/routes/create-link';
import { listLinksRoute } from './http/routes/list-links';
import { redirectLinkRoute } from './http/routes/redirect-link';


const app = fastify();

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

app.listen({
  port: 3333,
}).then(() => {
  console.log('🔥 Servidor rodando em http://localhost:3333');
  console.log('📚 Documentação em http://localhost:3333/docs');
})