import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { GuildRepository } from '../guildRepository'

export class PrismaGuildRepository implements GuildRepository {
  // eslint-disable-next-line no-use-before-define
  private static instance: PrismaGuildRepository

  static getInstance() {
    if (this.instance) {
      return this.instance
    }
    this.instance = new PrismaGuildRepository()
    return this.instance
  }

  async create(data: Prisma.GuildCreateInput) {
    const checkIn = await prisma.guild.create({
      data,
    })

    return checkIn
  }
}
