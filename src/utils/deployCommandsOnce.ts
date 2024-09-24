import { Commands } from '@/discord/commands'
import { REST, Routes } from 'discord.js'
import 'dotenv/config'

const { DISCORD_CLIENT_ID, DISCORD_TOKEN, GUILD_ID } = process.env

if (!DISCORD_TOKEN) throw new Error('Variable missing')

const commandsToRegister = Object.values(Commands.list).map((command) => {
  return command.data
})

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN)

;(async () => {
  try {
    if (!DISCORD_CLIENT_ID || !GUILD_ID) throw new Error('Variable missing')
    console.log(`Reseting ${commandsToRegister.length} commands....`)
    await rest.put(
      Routes.applicationGuildCommands(DISCORD_CLIENT_ID, GUILD_ID),
      {
        body: commandsToRegister,
      },
    )
    console.log(`Commands register sucessfully`)
  } catch (error) {
    console.error(error)
  }
})()
