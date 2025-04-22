import cors from '@fastify/cors';
import dotenv from 'dotenv';
import Fastify from 'fastify';

import { aiRoutes } from './routes/ai';

dotenv.config();

const server = Fastify();

await aiRoutes(server);

await server.register(cors, {
  origin: 'http://localhost:3000',
});

server.listen({ port: 3001 }, (error, address) => {
  if (error) {
    server.log.error(error);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
