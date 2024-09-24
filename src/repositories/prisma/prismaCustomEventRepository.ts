import { CustomEventDiscord, Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'

export class PrismaCustomEventRepository {
  // eslint-disable-next-line no-use-before-define
  private static customEventRepository: PrismaCustomEventRepository

  static getCustomEventRepository() {
    if (this.customEventRepository) {
      return this.customEventRepository
    }
    this.customEventRepository = new PrismaCustomEventRepository()
    return this.customEventRepository
  }

  async create(
    data: Prisma.CustomEventDiscordCreateInput,
  ): Promise<CustomEventDiscord> {
    const customEvent = await prisma.customEventDiscord.create({ data })

    return customEvent
  }

  async getEventByNameAndGuildId(guildId: string, name: string) {
    console.log('GuildId', guildId)
    console.log('Name', name)
    const customEvent = await prisma.customEventDiscord.findUnique({
      where: { guildId, name },
    })

    return customEvent
  }

  async update(customEvent: CustomEventDiscord): Promise<CustomEventDiscord> {
    const updatedCustomEvent = await prisma.customEventDiscord.update({
      where: {
        id: customEvent.id,
      },
      data: {
        kitsuneVotes: customEvent.kitsuneVotes,
        yokaiVotes: customEvent.yokaiVotes,
        total: customEvent.total,
      },
    })

    return updatedCustomEvent
  }
}
