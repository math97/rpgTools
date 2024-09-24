import { REST, Routes, Guild } from 'discord.js'
import { Commands } from '@/discord/commands'

export async function deployCommands(guild: Guild) {
  const { DISCORD_CLIENT_ID, DISCORD_TOKEN } = process.env

  const commandsData = Object.values(Commands.list).map(
    (command) => command.data,
  )

  if (!DISCORD_TOKEN) throw new Error('missing token')

  const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN)
  try {
    if (!DISCORD_CLIENT_ID) throw new Error('missing token')
    if (!guild) throw new Error('missing guild')

    console.log(
      ` Started refreshing application (/) commands for ${guild.name}`,
    )

    await rest.put(
      Routes.applicationGuildCommands(DISCORD_CLIENT_ID, guild.id),
      {
        body: commandsData,
      },
    )

    console.log('Successfully reloaded application (/) commands.')
  } catch (error) {
    console.error(error)
  }
}
