import 'dotenv/config'
import { REST, Routes } from 'discord.js'
import commands from '../commands'
import listCommands from '@/discord/listCommands'

const { CLIENT_ID, TOKEN, GUILD_ID } = process.env

if (!TOKEN) throw new Error('Variable missing')

const commandsToRegister = Object.values(listCommands).map(
  (command) => command.data,
)


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
