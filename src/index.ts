import 'dotenv/config'
import { Client, Collection, Events, GatewayIntentBits,BaseClient, CommandInteraction, StringSelectMenuInteraction } from "discord.js"
import commands from './commands'
import { deployCommands } from './utils/deployCommands';
import { Command } from './models/Command';

const {TOKEN} = process.env

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection<string,Command>()

const commandsToRegister = Object.entries(commands).map((command) => command);

commandsToRegister.forEach(command=>{
	console.log('command',command);
	client.commands.set(command[0],command[1])
})

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(TOKEN);

client.on("guildCreate", async (guild) => {
	await deployCommands();
  });

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isCommand()) {
		return;
	}

	const command = client.commands.get(interaction.commandName)

	if(!command){
		console.error("Command not found")
		return
	}

	try {
		await command.execute(interaction)
	} catch (error) {
		console.error(`Failed command ${command} with error: ${error}`)
		await interaction.reply(`There was an error executin command: ${command.commandName}`)
	}
})
