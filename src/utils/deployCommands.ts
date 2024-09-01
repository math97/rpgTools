import { REST, Routes, Guild } from 'discord.js'
import { Commands } from '@/discord/commands'
import { PrismaGuildRepository } from '@/repositories/prisma/prismaGuildRepository'
import { RegisterNewGuildUseCase } from '@/useCases/registerNewGuildUseCase'
import { PrismaHomebrewRepository } from '@/repositories/prisma/prismaHomebrewRepository'

export async function deployCommands(guild: Guild) {
  const { CLIENT_ID, TOKEN } = process.env

  const commandsData = Object.values(Commands.list).map(
    (command) => command.data,
  )

  if (!TOKEN) throw new Error('missing token')

  const rest = new REST({ version: '10' }).setToken(TOKEN)
  try {
    if (!CLIENT_ID) throw new Error('missing token')
    if (!guild) throw new Error('missing guild')

    console.log(
      ` Started refreshing application (/) commands for ${guild.name}`,
    )

    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, guild.id), {
      body: commandsData,
    })

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

    console.log('Successfully reloaded application (/) commands.')
  } catch (error) {
    console.error(error)
  }
}
