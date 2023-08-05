import { type UsersRepository } from '@/repositories/users-repository'
import { type User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUserProfileRequest {
  userId: string
}

interface GetUserProfileResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor (private readonly userRepository: UsersRepository) {}

  async execute ({
    userId
  }: GetUserProfileRequest): Promise<GetUserProfileResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user
    }
  }
}
