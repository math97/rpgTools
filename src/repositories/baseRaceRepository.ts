import { BaseRace, Prisma } from '@prisma/client'

export interface BaseRaceRepository {
  create(race: Prisma.BaseRaceCreateInput): Promise<BaseRace>
}
