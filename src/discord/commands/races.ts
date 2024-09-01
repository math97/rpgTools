import { Command as CommandType } from '@/models/Command'
import {
  CommandInteraction,
  InteractionResponse,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from 'discord.js'
import { Command } from './index'

export class RacesCommand extends Command<string> {
  protected data: string[]
  constructor(name: string) {
    super(name)
    this.name = 'races'
    this.data = [
      'dwarf',
      'elf',
      'halfling',
      'human',
      'dragonborn',
      'gnome',
      'half-elf',
      'half-orc',
      'tiefling',
    ]
  }

  public buildCommand(): CommandType {
    return {
      name: this.name?.toLowerCase() ?? '',
      data: this.command(),
      execute: async (
        interaction: CommandInteraction,
      ): Promise<InteractionResponse | void> => {
        return interaction.reply(
          "Here's a list of races on D&D 5e: \n" + this.data.join(', '),
        )
      },
    }
  }

  private command(): SlashCommandOptionsOnlyBuilder {
    return new SlashCommandBuilder()
      .setName(this.name?.toLowerCase() ?? '')
      .setDescription('Replies with races from D&D 5e!')
  }
}
