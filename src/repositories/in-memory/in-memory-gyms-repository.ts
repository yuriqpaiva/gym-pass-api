import { type Gym } from '@prisma/client'
import { type GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = []

  async findById (id: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => gym.id === id) ?? null

    return gym
  }
}
