import { type Gym } from '@prisma/client'
import { type GymsRepository } from '@/repositories/gyms-repository'

interface CreateGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  longitude: number
  latitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor (
    private readonly gymsRepository: GymsRepository
  ) {}

  async execute ({
    title,
    description,
    phone,
    longitude,
    latitude
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      title,
      description,
      phone,
      longitude,
      latitude
    })

    return {
      gym
    }
  }
}
