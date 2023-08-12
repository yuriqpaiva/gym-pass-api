import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { it, describe, expect, beforeAll, afterAll } from 'vitest'

describe('Create check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        description: 'The best gym for JavaScript developers',
        phone: '123456789',
        latitude: -27.2092052,
        longitude: -49.6401091
      }
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set({
        Authorization: `Bearer ${token}`
      }).send({
        latitude: -27.2092052,
        longitude: -49.6401091
      })

    expect(response.statusCode).toBe(201)
  })
})
