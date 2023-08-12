import { type FastifyReply, type FastifyRequest } from 'fastify'

export async function refresh (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<FastifyReply> {
  await request.jwtVerify({ onlyCookie: true }) // Get refresh token from cookie

  const { role } = request.user

  const token = await reply.jwtSign({
    role
  }, { sub: request.user.sub })
  const refreshToken = await reply.jwtSign({
    role
  }, { sub: request.user.sub, expiresIn: '7d' })

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true
    })
    .status(200).send({ token })
}
