import 'dotenv/config'
import { Client, Collection, Events, GatewayIntentBits, Interaction } from 'discord.js'
import commands from './commands'
import { deployCommands } from './utils/deployCommands'
import { Command } from './models/Command'
const { TOKEN } = process.env

const client = new Client({ intents: [GatewayIntentBits.Guilds] })
client.commands = new Collection<string, Command>()
  
import listCommands from './discord/listCommands'
console.log(listCommands);
listCommands.forEach((command) => {
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
