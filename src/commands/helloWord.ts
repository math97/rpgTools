import { Command } from "@/models/Command";
import { CommandInteraction, InteractionResponse, SlashCommandBuilder } from "discord.js";


export default {
  data : new SlashCommandBuilder()
  .setName("Hello")
  .setDescription("Replies with Word!"),
 execute: async (interaction: CommandInteraction):Promise<InteractionResponse | void> =>{
  return interaction.reply("Pong!");
}
} as Command
