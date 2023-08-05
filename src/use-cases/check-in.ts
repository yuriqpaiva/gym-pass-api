import { type CheckIn } from '@prisma/client'
import { type CheckInsRepository } from '@/repositories/check-ins-repository'

interface CheckInRequest {
  userId: string
  gymId: string
}

interface CheckInResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor (private readonly checkInsRepository: CheckInsRepository) {}

  async execute ({
    userId,
    gymId
  }: CheckInRequest): Promise<CheckInResponse> {
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId
    })

    return {
      checkIn
    }
  }
}
