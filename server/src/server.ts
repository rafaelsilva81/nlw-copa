import Fastify from 'fastify';
import cors from '@fastify/cors';
import * as dotenv from 'dotenv';

dotenv.config();
const port = Number(process.env.PORT) || 3000;

const bootstrap = async () => {
  const fastify = Fastify({ logger: true });
  const port = Number(process.env.PORT) || 3000;

  await fastify.register(cors, { origin: true });

  await fastify.register(import('./routes/poll'), { prefix: '/poll' });
  await fastify.register(import('./routes/user'), { prefix: '/user' });
  /* await fastify.register(import('./routes/games'), { prefix: '/games' }); */
  await fastify.register(import('./routes/guess'), { prefix: '/guess' });

  await fastify.listen({ port });
};

console.log(`Server running on http://localhost:${port}`);
bootstrap();
