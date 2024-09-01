import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { HomebrewRepository } from '../homebrewRepository'

export class PrismaHomebrewRepository implements HomebrewRepository {
  // eslint-disable-next-line no-use-before-define
  private static instance: PrismaHomebrewRepository

  static getInstance() {
    if (this.instance) {
      return this.instance
    }
    this.instance = new PrismaHomebrewRepository()
    return this.instance
  }

  async create(data: Prisma.HomeBrewCreateInput) {
    const homeBrew = await prisma.homeBrew.create({
      data,
    })

    return homeBrew
  }
}
