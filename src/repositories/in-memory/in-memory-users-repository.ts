import { type Prisma, type User } from '@prisma/client'
import { type UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  private readonly users: User[] = []

  async findById (id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id) ?? null

    return user
  }

  async findByEmail (email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email) ?? null
    return user
  }

  async create (data: Prisma.UserCreateInput): Promise<User> {
    const newUser = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date()
    }

    this.users.push(newUser)

    return newUser
  }
}
