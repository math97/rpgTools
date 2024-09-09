import { Prisma, SubRace } from '@prisma/client'

export interface BaseSubRaceRepository {
  create(subraces: Prisma.SubRaceCreateInput): Promise<SubRace>
  findManyByName(names: string[]): Promise<SubRace[]>
}
