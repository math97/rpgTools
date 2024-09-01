import { Commands } from '@/discord/commands'
import { REST, Routes } from 'discord.js'
import 'dotenv/config'

const { CLIENT_ID, TOKEN, GUILD_ID } = process.env

if (!TOKEN) throw new Error('Variable missing')

const commandsToRegister = Object.values(Commands.list).map((command) => {
  console.log('command', command)
  return command.data
})

const rest = new REST({ version: '10' }).setToken(TOKEN)

;(async () => {
  try {
    if (!CLIENT_ID || !GUILD_ID) throw new Error('Variable missing')
    console.log(`Reseting ${commandsToRegister.length} commands....`)
    console.log(`Commands to register: ${JSON.stringify(commandsToRegister)}`)
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commandsToRegister,
    })
    console.log(`Commands register sucessfully`)
  } catch (error) {
    console.error(error)
  }
})()
