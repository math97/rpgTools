import { Guild } from 'discord.js'
import { PrismaGuildRepository } from '@/repositories/prisma/prismaGuildRepository'
import { RegisterNewGuildUseCase } from '@/useCases/registerNewGuildUseCase'
import { PrismaHomebrewRepository } from '@/repositories/prisma/prismaHomebrewRepository'

export const registerGuildController = async (guild: Guild): Promise<void> => {
  const guildRepository = PrismaGuildRepository.getInstance()
  const homeBrewRepository = PrismaHomebrewRepository.getInstance()

  const registerNewGuildUseCase = new RegisterNewGuildUseCase(
    guildRepository,
    homeBrewRepository,
  )
  const description = guild.description ? guild.description : undefined

  const guildToRegister = { guildId: guild.id, name: guild.name, description }

  const { guild: guildRegistered, homebrew } =
    await registerNewGuildUseCase.execute(guildToRegister, {
      name: `${guild.name} Homebrews`,
      description: `Homebrews for ${guild.name}`,
    })

  console.log('Guild registered:', guildRegistered)
  console.log('homebrew registered:', homebrew)
}
