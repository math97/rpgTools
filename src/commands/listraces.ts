import { Command } from "@/models/Command";
import { CommandInteraction, InteractionResponse, SlashCommandBuilder } from "discord.js";

const races = ['Human', 'Elf', 'Dwarf', 'Halfling', 'Dragonborn', 'Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling'];

export default {
    data : new SlashCommandBuilder()
    .setName("races")
    .setName("listraces")
    .setDescription("Replies with races from D&D 5e!"),
   execute: async (interaction: CommandInteraction):Promise<InteractionResponse | void> =>{
    
    return interaction.reply(`Here are the races from D&D 5e: ${races.join(', ')}`);
  }
  } as Command