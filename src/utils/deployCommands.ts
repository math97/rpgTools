import { REST, Routes } from "discord.js";
import  commands from "../commands";

const {CLIENT_ID,TOKEN,GUILD_ID} = process.env

const commandsData = Object.values(commands).map((command) => command.data);

if(!TOKEN) throw new Error('missing token')

const rest = new REST({ version: "10" }).setToken(TOKEN);

export async function deployCommands() {
  try {
    if(!CLIENT_ID || !GUILD_ID) throw new Error('missing token')

    console.log("Started refreshing application (/) commands.");

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      {
        body: commandsData,
      }
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}