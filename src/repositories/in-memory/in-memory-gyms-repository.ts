import { Prisma, type Gym } from '@prisma/client'
import { type GymsRepository } from '../gyms-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  async findById (id: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => gym.id === id) ?? null

    return gym
  }

  async create (data: Prisma.GymCreateInput): Promise<Gym> {
    const newGym: Gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      longitude: new Prisma.Decimal(data.longitude.toString()),
      latitude: new Prisma.Decimal(data.latitude.toString())
    }

    this.gyms.push(newGym)

    return newGym
  }
}
