import options from '@/data/races/index'
import { Command as CommandType } from '@/models/Command'
import {
  CommandInteraction,
  EmbedBuilder,
  InteractionResponse,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from 'discord.js'
import { EmbedCommand } from '../index'
import { buildEmbedRace } from '../../utils/buildEmbedRace'
import { Race } from '@/models/Races'

export class RaceCommand extends EmbedCommand<string> {
  protected data: Race
  constructor(name: string) {
    super(name)
    this.name = name ?? 'Race'
    this.data = {} as Race
  }

  public buildEmbed(): EmbedBuilder[] {
    const raceEmbed = buildEmbedRace(this.data)

    return [raceEmbed]
  }

  public buildCommand(): CommandType {
    return {
      name: this.name?.toLowerCase() ?? '',
      data: this.command(),
      execute: async (
        interaction: CommandInteraction,
      ): Promise<InteractionResponse | void> => {
        console.log('raceOption', interaction.options)
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
