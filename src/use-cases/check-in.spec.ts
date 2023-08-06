import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error'
import { MaxDistanceError } from './errors/max-distance-error'

let usersRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Register Use Case', async () => {
  beforeEach(async () => {
    usersRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(usersRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym_id',
      title: 'JavaScript Gym',
      description: 'The best gym to learn JavaScript',
      phone: '123456789',
      latitude: 0,
      longitude: 0
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user_id',
      gymId: 'gym_id',
      userLatitude: 0,
      userLongitude: 0
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'user_id',
      gymId: 'gym_id',
      userLatitude: 0,
      userLongitude: 0
    })

    await expect(async () =>
      sut.execute({
        userId: 'user_id',
        gymId: 'gym_id',
        userLatitude: 0,
        userLongitude: 0
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId: 'user_id',
      gymId: 'gym_id',
      userLatitude: 0,
      userLongitude: 0
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user_id',
      gymId: 'gym_id',
      userLatitude: 0,
      userLongitude: 0
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.gyms.push({
      id: 'gym-02',
      title: 'JavaScript Gym',
      description: 'The best gym to learn JavaScript',
      phone: '123456789',
      latitude: new Decimal(-27.0747279),
      longitude: new Decimal(-49.4889672)
    })

    await expect(async () =>
      sut.execute({
        userId: 'user_id',
        gymId: 'gym-02',
        userLatitude: -27.2092052,
        userLongitude: -49.6401091
      })
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
