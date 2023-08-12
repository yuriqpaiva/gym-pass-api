import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import request from 'supertest'
import { it, describe, expect, beforeAll, afterAll } from 'vitest'

describe('Search gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set({
        Authorization: `Bearer ${token}`
      })
      .send({
        title: 'JavaScript Gym',
        description: 'The best gym for JavaScript developers',
        phone: '123456789',
        latitude: -27.2092052,
        longitude: -49.6401091
      })

    await request(app.server)
      .post('/gyms')
      .set({
        Authorization: `Bearer ${token}`
      })
      .send({
        title: 'TypeScript Gym',
        description: 'The best gym for TypeScript developers',
        phone: '123456789',
        latitude: -27.2092052,
        longitude: -49.6401091
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        q: 'JavaScript'
      })
      .set({
        Authorization: `Bearer ${token}`
      })
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym'
      })
    ])
  })
})
