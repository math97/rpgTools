import { BaseRace, Prisma } from '@prisma/client'
import { BaseRaceWithRelations } from './prisma/prismaBaseRaceRepository'

export interface BaseRaceRepository {
  create(race: Prisma.BaseRaceCreateInput): Promise<BaseRace>
  findRaceByName(name: string): Promise<BaseRaceWithRelations | null>
}
