import { type CheckIn } from '@prisma/client'
import { type CheckInsRepository } from '@/repositories/check-ins-repository'

interface FetchUserCheckInHistoryRequest {
  userId: string
  page: number
}

interface FetchUserCheckInHistoryResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInHistoryUseCase {
  constructor (private readonly checkInsRepository: CheckInsRepository
  ) {}

  async execute ({
    userId,
    page
  }: FetchUserCheckInHistoryRequest): Promise<FetchUserCheckInHistoryResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

    return {
      checkIns
    }
  }
}
