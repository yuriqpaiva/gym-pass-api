import { type Gym, type Prisma } from '@prisma/client'
import {
  type FindManyNearbyParams,
  type GymsRepository
} from '../gyms-repository'
import { prisma } from '@/lib/prisma'

export class PrismaGymsRepository implements GymsRepository {
  async findById (id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id
      }
    })

    return gym
  }

  async findManyNearby ({
    latitude,
    longitude
  }: FindManyNearbyParams): Promise<Gym[]> {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms
  }

  async searchMany (search: string, page: number): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: search
        }
      },
      skip: (page - 1) * 20,
      take: 20
    })

    return gyms
  }

  async create (data: Prisma.GymCreateInput): Promise<any> {
    const createdGym = await prisma.gym.create({
      data
    })

    return createdGym
  }
}
