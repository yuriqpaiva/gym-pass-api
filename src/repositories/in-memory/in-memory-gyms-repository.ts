import { Prisma, type Gym } from '@prisma/client'
import { type FindManyNearbyParams, type GymsRepository } from '../gyms-repository'
import { randomUUID } from 'node:crypto'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-cordinates'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  async findById (id: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => gym.id === id) ?? null

    return gym
  }

  async findManyNearby (params: FindManyNearbyParams): Promise<Gym[]> {
    return this.gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber()
        }, {
          latitude: params.latitude,
          longitude: params.longitude
        }
      )

      return distance <= 10
    })
  }

  async searchMany (query: string, page: number): Promise<Gym[]> {
    return this.gyms
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20)
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
