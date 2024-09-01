import { REST, Routes, Guild } from 'discord.js'
import { Commands } from '@/discord/commands'

const { CLIENT_ID, TOKEN } = process.env

const commandsData = Object.values(Commands.list).map((command) => command.data)

if (!TOKEN) throw new Error('missing token')

const rest = new REST({ version: '10' }).setToken(TOKEN)

export async function deployCommands(guild: Guild) {
  try {
    if (!CLIENT_ID) throw new Error('missing token')
    if (!guild) throw new Error('missing guild')

    console.log(
      ` Started refreshing application (/) commands for ${guild.name}`,
    )

    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, guild.id), {
      body: commandsData,
    })

    console.log('Successfully reloaded application (/) commands.')
  } catch (error) {
    console.error(error)
  }
}
