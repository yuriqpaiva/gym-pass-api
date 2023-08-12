import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { it, describe, expect, beforeAll, afterAll } from 'vitest'

describe('Create gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/gyms')
      .set({
        Authorization: `Bearer ${token}`
      }).send({
        title: 'JavaScript Gym',
        description: 'The best gym for JavaScript developers',
        phone: '123456789',
        latitude: -27.2092052,
        longitude: -49.6401091
      })

    expect(response.statusCode).toBe(201)
  })
})
