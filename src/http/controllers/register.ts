import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply> {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({ name, email, password })
  } catch (e) {
    if (e instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: e.message
      })
    }

    throw e
  }

  return reply.status(201).send()
}
