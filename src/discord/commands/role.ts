import {
  AnyCharacterClass,
  barbarianClass,
  CharacterClass,
  monkClass,
} from '@/models/CharacterClass'
import { buildEmbedClass } from '@/utils/buildClassEmbed'

import { role } from '@/data/roles'
import {
  CommandInteraction,
  EmbedBuilder,
  InteractionResponse,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from 'discord.js'
import { Command as CommandType } from '@/models/Command'
import { Command } from '.'

export class RoleCommand extends Command<string> {
  protected data: AnyCharacterClass | undefined
  protected name: string
  constructor(name: string) {
    super(name)
    this.name = name
  }

  public buildEmbed(): EmbedBuilder[] {
    const classEmbed = buildEmbedClass(this.data as CharacterClass)

    return [classEmbed]
  }

  public buildCommand(): CommandType {
    return {
      name: this.name.toLowerCase(),
      data: this.command(),
      execute: async (
        interaction: CommandInteraction,
      ): Promise<InteractionResponse | void> => {
        const option = interaction.options.get('filter')?.value

        const data =
          role.rolesOption.find((role) => role.name.toLowerCase() === option) ||
          null

        if (!data) return interaction.reply(`Role not found`)

        this.data = role.getRole(data.name) as AnyCharacterClass
        
        return interaction.reply({ embeds: this.buildEmbed() })
      },
    }
  }

  private command(): SlashCommandOptionsOnlyBuilder {
    return new SlashCommandBuilder()
      .setName(this.name.toLowerCase())
      .setDescription('Replies with roles from D&D 5e!')
      .addStringOption((option) =>
        option
          .setName('filter')
          .setDescription('Filter roles by name')
          .setRequired(true)
          .addChoices(role.rolesOption),
      )
  }
}
