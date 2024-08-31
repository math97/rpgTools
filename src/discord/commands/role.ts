import { barbarianClass, CharacterClass } from '@/models/CharacterClass'
import { buildEmbedClass } from '@/utils/buildClassEmbed'

import { role } from '@/data/roles'
import {
  CommandInteraction,
  EmbedBuilder,
  InteractionResponse,
  SlashCommandBuilder,
} from 'discord.js'
import { commandClass } from '../command.class'
import { Command } from '@/models/Command'

export class RoleCommand extends commandClass<string> {
  private data: CharacterClass | barbarianClass
  constructor(info: string) {
    super(info)
    this.data = role.getRole(info) as CharacterClass | barbarianClass
  }

  public buildEmbed(): EmbedBuilder[] {
    const classEmbed = buildEmbedClass(this.data)
    const a = 400

    const levelEmbed = new EmbedBuilder()
      .setColor('Orange')
      .setTitle(`${this.data.className}' Levels`)
      .setDescription(`Levels and features`)
      .addFields(
        ...this.data.levels.map((level) => ({
          name: `Level ${level.level}`,
          value: level.features.join(', '),
          inline: true,
        })),
      )

    return [classEmbed, levelEmbed]
  }

  public buildCommand(): Command {
    return {
      name: this.data?.className.toLowerCase(),
      data: this.command(),
      execute: async (
        interaction: CommandInteraction,
      ): Promise<InteractionResponse | void> => {
        const embeds = this.buildEmbed()
        return interaction.reply({ embeds })
      },
    }
  }

  private command(): SlashCommandBuilder {
    return new SlashCommandBuilder()
      .setName(this.data?.className.toLowerCase())
      .setDescription(
        `Replies with data from ${this.data.className} class from D&D 5e!`,
      )
  }
}
