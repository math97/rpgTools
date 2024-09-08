import { BaseRace, Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { BaseRaceRepository } from '../baseRaceRepository'

export type BaseRaceWithRelations = Prisma.BaseRaceGetPayload<{
  include: { abilityScore: true; subRaces: true }
}>

export class PrismaBaseRaceRepository implements BaseRaceRepository {
  // eslint-disable-next-line no-use-before-define
  private static baseRaceRepository: PrismaBaseRaceRepository

  static getGuildRepository() {
    if (this.baseRaceRepository) {
      return this.baseRaceRepository
    }
    this.baseRaceRepository = new PrismaBaseRaceRepository()
    return this.baseRaceRepository
  }

  async create(data: Prisma.BaseRaceCreateInput): Promise<BaseRace> {
    const race = await prisma.baseRace.create({ data })

    return race
  }

  async findRaceByName(name: string): Promise<BaseRaceWithRelations | null> {
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1)
    const race = await prisma.baseRace.findUnique({
      where: {
        name: capitalizedName,
      },
      include: {
        subRaces: true,
        abilityScore: true,
      },
    })

    return race
  }
}
