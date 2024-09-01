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
const { TOKEN } = process.env

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.commands = new Collection<string, Command>()
Commands.list.forEach((command) => {
  client.commands.set(command.name, command)
})

client.once(Events.ClientReady, (readyClient: Client) => {
  console.log(`Ready! Logged in as ${readyClient.user?.tag}`)
})

client.login(TOKEN)

client.on('guildCreate', async () => {
  await deployCommands()
})

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  if (!interaction.isCommand()) {
    return
  }

  const command = client.commands.get(interaction.commandName)
  if (!command) {
    console.error('Command not found')
    return
  }

  try {
    await command.execute(interaction)
  } catch (error) {
    console.error(`Failed command ${command.commandName} with error: ${error}`)
    await interaction.reply(
      `There was an error executin command: ${command.commandName}`,
    )
  }
})
