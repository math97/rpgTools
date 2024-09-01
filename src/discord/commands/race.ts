import options from '@/data/races/index'
import { Race } from '@/data/races/races.interface'
import { Command as CommandType } from '@/models/Command'
import {
  CommandInteraction,
  EmbedBuilder,
  InteractionResponse,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from 'discord.js'
import { EmbedCommand } from './index'

export class RaceCommand extends EmbedCommand<string> {
  protected data: Race
  constructor(name: string) {
    super(name)
    this.name = name ?? 'Race'
    this.data = {} as Race
  }

  public buildEmbed(): EmbedBuilder[] {
    const raceEmbed = new EmbedBuilder()
      .setColor('Orange')
      .setTitle(this.data.name)
      .setDescription(`Characteristics of race ${this.data.name}`)
      .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'abilityScore', value: this.data.abilityScore, inline: true },
        { name: 'traits', value: this.data.traits.join('\n'), inline: true },
        {
          name: 'languages',
          value: this.data.languages.join(', '),
          inline: true,
        },
        {
          name: 'proficiencies',
          value: this.data.proficiencies.toString(),
          inline: true,
        },
      )

    return [raceEmbed]
  }

  public buildCommand(): CommandType {
    return {
      name: this.name?.toLowerCase() ?? '',
      data: this.command(),
      execute: async (
        interaction: CommandInteraction,
      ): Promise<InteractionResponse | void> => {
        const raceOption = interaction.options.get('filter')?.value

        this.data =
          options.races.find(
            (race) => race.name.toLowerCase() === raceOption,
          ) ?? ({} as Race)

        if (!this.data) return interaction.reply(`Race not found`)

        return interaction.reply({ embeds: this.buildEmbed() })
      },
    }
  }

  private command(): SlashCommandOptionsOnlyBuilder {
    return new SlashCommandBuilder()
      .setName(this.name?.toLowerCase() ?? '')
      .setDescription('Replies with races from D&D 5e!')
      .addStringOption((option) =>
        option
          .setName('filter')
          .setDescription('Filter races by name')
          .setRequired(true)
          .addChoices(options.racesOption),
      )
  }
}
