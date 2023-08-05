import { describe, it, expect, beforeEach } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

let usersRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(usersRepository)
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user_id',
      gymId: 'gym_id'
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
