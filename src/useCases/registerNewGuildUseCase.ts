/* eslint-disable no-useless-constructor */
import { Guild, HomeBrew, Prisma } from '@prisma/client'
import { GuildRepository } from '../repositories/guildRepository'
import { HomebrewRepository } from '../repositories/homebrewRepository'

export class RegisterNewGuildUseCase {
  constructor(
    private guildRepository: GuildRepository,
    private homebrewRepository: HomebrewRepository,
  ) {}

  async execute(
    guildData: Prisma.GuildCreateInput,
    homebrewData: Prisma.HomeBrewCreateWithoutGuildInput,
  ): Promise<{ guild: Guild; homebrew: HomeBrew }> {
    const guild = await this.guildRepository.create(guildData)

    const homebrew = await this.homebrewRepository.create({
      ...homebrewData,
      guild: { connect: { id: guild.id } },
    })

    return { guild, homebrew }
  }
}
