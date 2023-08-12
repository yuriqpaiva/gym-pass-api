import { type FastifyRequest, type FastifyReply } from 'fastify'

export function verifyUserRole (roleToVerify: 'ADMIN' | 'MEMBER') {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user

    if (role !== roleToVerify) {
      return reply.status(403).send({
        message: 'Forbidden'
      })
    }
  }
}
