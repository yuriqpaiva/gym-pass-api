import { type CheckIn, type Prisma } from '@prisma/client'
import { type CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  private readonly checkIns: CheckIn[] = []

  async create (data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const newCheckIn: CheckIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date()
    }

    this.checkIns.push(newCheckIn)

    return newCheckIn
  }
}
