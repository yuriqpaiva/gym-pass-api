import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply> {
  const searchGymsQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1)
  })

  const {
    q, page
  } = searchGymsQuerySchema.parse(request.query)

  const searchGymUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchGymUseCase.execute({
    query: q,
    page
  })

  return reply.status(200).send({
    gyms
  })
}
