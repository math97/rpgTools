import { CustomRace, Prisma } from '@prisma/client'

export interface CustomRaceRepository {
  create(race: Prisma.CustomRaceCreateInput): Promise<CustomRace>
}
