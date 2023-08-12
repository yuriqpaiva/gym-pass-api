import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { type FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { register } from './register'

export async function usersRoutes (app: FastifyInstance): Promise<void> {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  // Authenticated routes
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
