import { GetUserMetricsUseCase } from '../get-user-metrics'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeGetUserMetricsUseCase (): GetUserMetricsUseCase {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new GetUserMetricsUseCase(checkInsRepository)

  return useCase
}
