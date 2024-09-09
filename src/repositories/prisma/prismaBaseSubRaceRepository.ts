import { Prisma, SubRace } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { BaseSubRaceRepository } from '../baseSubRaceRepository'

export class PrismaBaseSubRaceRepository implements BaseSubRaceRepository {
  // eslint-disable-next-line no-use-before-define
  private static baseSubRaceRepository: PrismaBaseSubRaceRepository

  static getGuildRepository() {
    if (this.baseSubRaceRepository) {
      return this.baseSubRaceRepository
    }
    this.baseSubRaceRepository = new PrismaBaseSubRaceRepository()
    return this.baseSubRaceRepository
  }

  async create(data: Prisma.SubRaceCreateInput): Promise<SubRace> {
    const subRace = await prisma.subRace.create({
      data,
    })
    return subRace
  }

  async findManyByName(names: string[]): Promise<SubRace[]> {
    const subRaces = await prisma.subRace.findMany({
      where: { name: { in: names } },
    })
    return subRaces
  }
}
