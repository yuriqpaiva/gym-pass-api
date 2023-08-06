import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', async () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get check ins count from metrics', async () => {
    await checkInsRepository.create({
      user_id: 'any_user_id',
      gym_id: 'gym-01'
    })

    await checkInsRepository.create({
      user_id: 'any_user_id',
      gym_id: 'gym-02'
    })

    const { checkInsCount } = await sut.execute({
      userId: 'any_user_id',
      page: 1
    })

    expect(checkInsCount).toEqual(2)
  })
})
