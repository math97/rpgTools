import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { HomebrewRepository } from '../homebrewRepository'

export class PrismaHomebrewRepository implements HomebrewRepository {
  // eslint-disable-next-line no-use-before-define
  private static homeBrewRepository: PrismaHomebrewRepository

  static getHomeBrewRepository() {
    if (this.homeBrewRepository) {
      return this.homeBrewRepository
    }
    this.homeBrewRepository = new PrismaHomebrewRepository()
    return this.homeBrewRepository
  }

  async create(data: Prisma.HomeBrewCreateInput) {
    const homeBrew = await prisma.homeBrew.create({
      data,
    })

    return homeBrew
  }

  async findByGuildId(guildId: string) {
    const homeBrew = await prisma.homeBrew.findFirst({ where: { guildId } })

    return homeBrew
  }
}
