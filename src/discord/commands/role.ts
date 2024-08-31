import { barbarianClass, CharacterClass } from '@/models/CharacterClass'
import { buildEmbedClass } from '@/utils/buildClassEmbed'

import { role } from '@/data/roles'
import {
  CommandInteraction,
  EmbedBuilder,
  InteractionResponse,
  SlashCommandBuilder,
} from 'discord.js'
import { commandClass } from '.'
import { Command } from '@/models/Command'

export class RoleCommand extends commandClass<string> {
  private data: CharacterClass | barbarianClass;
  protected name: string = '';
  constructor(name: string) {
    super(name)
    this.name = name;
    this.data = role.getRole(name) as CharacterClass | barbarianClass
  }

  public buildEmbed(): EmbedBuilder[] {
    const classEmbed = buildEmbedClass(this.data)

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
      name: this.name.toLowerCase(),
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
      .setName(this.name.toLowerCase())
      .setDescription(
        `Replies with data from ${this.name} from D&D 5e!`,
      )
  }
}
