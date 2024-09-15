import { CustomRace, Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { CustomRaceRepository } from '../customRaceRepository'

export type BaseRaceWithRelations = Prisma.BaseRaceGetPayload<{
  include: { abilityScore: true; subRaces: true }
}>

export class PrismaCustomRaceRepository implements CustomRaceRepository {
  // eslint-disable-next-line no-use-before-define
  private static customRaceRepository: PrismaCustomRaceRepository

  static getCustomRaceRepository() {
    if (this.customRaceRepository) {
      return this.customRaceRepository
    }
    this.customRaceRepository = new PrismaCustomRaceRepository()
    return this.customRaceRepository
  }

  async create(data: Prisma.CustomRaceCreateInput): Promise<CustomRace> {
    const customRace = await prisma.customRace.create({ data })

    return customRace
  }
}
