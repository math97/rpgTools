import { Commands } from '@/discord/commands'
import { Client, Events, GatewayIntentBits, REST, Routes } from 'discord.js'
import 'dotenv/config'

const { DISCORD_CLIENT_ID, DISCORD_TOKEN } = process.env

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once(Events.ClientReady, (readyClient: Client) => {
  console.log(`Ready! Logged in as ${readyClient.user?.tag}`)
})

if (!DISCORD_TOKEN) throw new Error('Variable missing')

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN)

;(async () => {
  try {
    if (!DISCORD_CLIENT_ID) throw new Error('Variable missing')

    const guildIds = client.guilds.cache.map((guild) => guild.id)
    const commandsToRegister = Object.values(Commands.list).map((command) => {
      return command.data
    })

    guildIds.forEach(async (guildId) => {
      console.log(` Started refreshing application (/) commands for ${guildId}`)

      await rest.put(
        Routes.applicationGuildCommands(DISCORD_CLIENT_ID, guildId),
        {
          body: commandsToRegister,
        },
      )

      console.log('Successfully reloaded application (/) commands.')
    })
  } catch (error) {
    console.error(error)
  }
})()
