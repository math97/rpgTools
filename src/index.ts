import {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  Interaction,
} from 'discord.js'
import 'dotenv/config'
import { Command } from './models/Command'
import { deployCommands } from './utils/deployCommands'

import { Commands } from './discord/commands'
import { RegisterGuildController } from './controllers/registerGuildController'
const { DISCORD_TOKEN } = process.env

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
const registerGuildController = new RegisterGuildController()
client.commands = new Collection<string, Command>()

Commands.list.forEach((command) => {
  client.commands.set(command.name, command)
})

client.once(Events.ClientReady, (readyClient: Client) => {
  console.log(`Ready! Logged in as ${readyClient.user?.tag}`)
})

client.login(DISCORD_TOKEN)

client.on('guildCreate', async (guild) => {
  await deployCommands(guild)
  await registerGuildController.execute(guild)
})

client.on('interactionCreate', async (interaction: Interaction) => {
  if (!interaction.isCommand() && !interaction.isModalSubmit()) {
    console.error('Not a command')
    return
  }
  if (interaction.isModalSubmit()) {
    if (interaction.customId === 'addRaceModalData') {
      const command = client.commands.get('savecustomrace')
      if (!command) {
        console.error('Command not found')
        return
      }
      await command.execute(interaction)
    }
  } else {
    console.log('Command received', interaction.commandName)
    const command = client.commands.get(interaction.commandName)
    if (!command) {
      console.error('Command not found')
      return
    }

    try {
      await command.execute(interaction)
    } catch (error) {
      console.error(
        `Failed command ${command.commandName} with error: ${error}`,
      )
      await interaction.reply(
        `There was an error executin command: ${command.commandName}`,
      )
    }
  }
})
