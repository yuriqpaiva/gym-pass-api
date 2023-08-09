import 'dotenv/config'

import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { type Environment } from 'vitest'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateDatabaseURL (schema: string): string {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL env var is not set')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

const environment: Environment = {
  name: 'prisma',
  setup: async () => {
    const schema = randomUUID()
    const databaseURL = generateDatabaseURL(schema)

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return {
      teardown: async () => {
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
        await prisma.$disconnect()
      }
    }
  }
}

export default environment
