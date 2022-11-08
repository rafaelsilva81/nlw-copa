import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import ShortUniqueId from 'short-unique-id';
import db from '../lib/prisma';

const routes = async (fastify: FastifyInstance) => {
  fastify.get('/count', async (request, reply) => {
    const count = await db.guess.count();
    reply.send({ count });
  });
};

export default routes;
