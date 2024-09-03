import { Guild, Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { GuildRepository } from '../guildRepository'

export class PrismaGuildRepository implements GuildRepository {
  // eslint-disable-next-line no-use-before-define
  private static guildRepository: PrismaGuildRepository

  static getGuildRepository() {
    if (this.guildRepository) {
      return this.guildRepository
    }
    this.guildRepository = new PrismaGuildRepository()
    return this.guildRepository
  }

  async create(data: Prisma.GuildCreateInput) {
    const guild = await prisma.guild.create({
      data,
    })

    return guild
  }

  async findByGuildId(guildId: string): Promise<Guild | null> {
    const guild = await prisma.guild.findUnique({
      where: {
        guildId,
      },
    })

    return guild
  }
}
