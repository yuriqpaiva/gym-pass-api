import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { type FastifyInstance } from 'fastify'
import { search } from './search'
import { nearby } from './nearby'
import { create } from './create'

export async function gymsRoutes (app: FastifyInstance): Promise<void> {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
  app.post('/gyms', create)
}