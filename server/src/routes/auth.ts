// This wont be used... but it's here for reference
// We are doing auth for the web app using next-auth
// This could be used for a mobile app or something else

/* import { FastifyInstance } from 'fastify';
import { z } from 'zod';

const auth = (fastify: FastifyInstance) => {
  fastify.post('/user/create', async (request, reply) => {
    const createUserBody = z.object({
      access_token: z.string(),
    });
    const { access_token } = createUserBody.parse(request.body);

    const userResponse = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const userData = await userResponse.json();

    const userInfoSchema = z.object({
      id: z.string(),
      email: z.string().email(),
      name: z.string(),
      picture: z.string().url(),
    });

    const { id, email, name, picture } = userInfoSchema.parse(userData);
    
    
  });
};

export default auth;
 */
