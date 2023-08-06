import { type CheckInsRepository } from '@/repositories/check-ins-repository'

interface GetUserMetricsRequest {
  userId: string
  page: number
}

interface GetUserMetricsResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor (private readonly checkInsRepository: CheckInsRepository) {}

  async execute ({
    userId
  }: GetUserMetricsRequest): Promise<GetUserMetricsResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId)

    return {
      checkInsCount
    }
  }
}
