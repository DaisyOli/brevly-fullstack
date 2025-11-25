import fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import path from 'path';
import fs from 'fs';

const app = fastify();

//1. carregar spec.yml
const specPath = path.join(__dirname, '..','docs', 'spec.yaml');
const openapi = fs.readFileSync(specPath, 'utf-8');

//2. registrar o swagger
app.register(swagger, {
  mode: 'static',
  specification: {
    path: specPath,
    baseDir: path.join(__dirname, '..'),
  },
});

// 3. registrar o swagger-ui
app.register(swaggerUi, {
  routePrefix: '/docs',
  staticCSP: true,
});

// rota de health 

app.get('/health', async () => {
  return { status: 'Tudo ok' };
})

app.listen({
  port: 3333,
}).then(() => {
  console.log('🔥 Servidor rodando em http://localhost:3333');
  console.log('📚 Documentação em http://localhost:3333/docs');
})