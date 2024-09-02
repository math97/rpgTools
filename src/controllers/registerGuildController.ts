import { Guild } from 'discord.js'
import { PrismaGuildRepository } from '@/repositories/prisma/prismaGuildRepository'
import { RegisterNewGuildUseCase } from '@/useCases/registerNewGuildUseCase'
import { PrismaHomebrewRepository } from '@/repositories/prisma/prismaHomebrewRepository'
import { GuildRepository } from '@/repositories/guildRepository'
import { HomebrewRepository } from '@/repositories/homebrewRepository'

export class registerGuildController {
  private guildRepository: GuildRepository
  private homeBrewRepository: HomebrewRepository
  constructor() {
    this.guildRepository = PrismaGuildRepository.getguildRepository()
    this.homeBrewRepository = PrismaHomebrewRepository.getHomeBrewRepository()
  }

  public async execution(guild: Guild): Promise<void> {
    const registerNewGuildUseCase = new RegisterNewGuildUseCase(
      this.guildRepository,
      this.homeBrewRepository,
    )

    const guildToRegister = {
      guildId: guild.id,
      name: guild.name,
      description: guild.description,
    }

    const { guild: guildRegistered, homebrew } =
      await registerNewGuildUseCase.execute(guildToRegister, {
        name: `${guild.name} Homebrews`,
        description: `Homebrews for ${guild.name}`,
      })

    console.log('Guild registered:', guildRegistered)
    console.log('homebrew registered:', homebrew)
  }
}
