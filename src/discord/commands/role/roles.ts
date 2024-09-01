import { Command as CommandType } from '@/models/Command'
import {
  CommandInteraction,
  InteractionResponse,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from 'discord.js'
import { Command } from '../index'
import { role } from '@/data/roles'

export class RolesCommand extends Command<string> {
  protected data: string[]
  constructor(name: string) {
    super(name)
    this.name = 'roles'
    this.data = role.getRoles()
  }

  public buildCommand(): CommandType {
    return {
      name: this.name?.toLowerCase() ?? '',
      data: this.command(),
      execute: async (
        interaction: CommandInteraction,
      ): Promise<InteractionResponse | void> => {
        return interaction.reply(
          "Here's a list of roles/classes on D&D 5e: \n" + this.data.join(', '),
        )
      },
    }
  }

  private command(): SlashCommandOptionsOnlyBuilder {
    return new SlashCommandBuilder()
      .setName(this.name?.toLowerCase() ?? '')
      .setDescription('Replies with roles/classes from D&D 5e!')
  }
}
