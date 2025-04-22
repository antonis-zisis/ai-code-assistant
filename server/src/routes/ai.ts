import axios from 'axios';
import type { FastifyInstance } from 'fastify';

export async function aiRoutes(server: FastifyInstance) {
  server.post('/api/ai', async (request, reply) => {
    const { prompt } = request.body as { prompt: string };

    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      server.log.error(error);
      return reply.status(500).send({ error: 'AI request failed' });
    }
  });
}
