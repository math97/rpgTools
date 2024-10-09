import { Commands } from '@/discord/commands'
import { REST, Routes } from 'discord.js'
import { env } from '../env'

const { CLIENT_ID, TOKEN, GUILD_ID } = env

if (!TOKEN) throw new Error('Variable missing')

const commandsToRegister = Object.values(Commands.list).map((command) => {
  return command.data
})

const rest = new REST({ version: '10' }).setToken(TOKEN)

;(async () => {
  try {
    if (!CLIENT_ID || !GUILD_ID) throw new Error('Variable missing')
    console.log(`Reseting ${commandsToRegister.length} commands....`)
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commandsToRegister,
    })
    console.log(`Commands register sucessfully`)
  } catch (error) {
    console.error(error)
  }
})()
