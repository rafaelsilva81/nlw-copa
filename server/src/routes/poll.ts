import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import ShortUniqueId from 'short-unique-id';
import db from '../lib/prisma';

const routes = async (fastify: FastifyInstance) => {
  fastify.get('/count', async (request, reply) => {
    const count = await db.poll.count();
    reply.send({ count });
  });

  fastify.post('/', async (request, reply) => {
    const createpollBody = z.object({
      title: z.string(),
    });

    const { title } = createpollBody.parse(request.body);
    const code = new ShortUniqueId().randomUUID(6).toUpperCase();

    const data = await db.poll.create({
      data: {
        title,
        code,
      },
    });

    reply.status(201).send(data);
  });
};

export default routes;
