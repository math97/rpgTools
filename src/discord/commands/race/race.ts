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
import { GetBaseRacesUseCase } from '@/useCases/races/getBaseRacesUseCase'
import {
  BaseRaceWithRelations,
  PrismaBaseRaceRepository,
} from '@/repositories/prisma/prismaBaseRaceRepository'
import { racesOption } from '@/models/Races'

export class RaceCommand extends EmbedCommand<string> {
  protected data: BaseRaceWithRelations
  private baseRaceRepository: PrismaBaseRaceRepository
  private getBaseRacesUseCase: GetBaseRacesUseCase

  constructor(name: string) {
    super(name)
    this.name = name ?? 'Race'
    this.data = {} as BaseRaceWithRelations
    this.baseRaceRepository = new PrismaBaseRaceRepository()
    this.getBaseRacesUseCase = new GetBaseRacesUseCase(this.baseRaceRepository)
  }

  public buildEmbed(): EmbedBuilder[] {
    const raceEmbed = buildEmbedRace(this.data)

    return [raceEmbed]
  }

  public getRaceImage(): { attachment: string; name: string } {
    const raceName = this.data.name.toLowerCase()
    return {
      attachment: `src/assets/races/${raceName}.png`,
      name: raceName + '.png',
    }
  }

  public buildCommand(): CommandType {
    return {
      name: this.name?.toLowerCase() ?? '',
      data: this.command(),
      execute: async (
        interaction: CommandInteraction,
      ): Promise<InteractionResponse | void> => {
        const raceOption = interaction.options.get('filter')?.value

        this.data = await this.getBaseRacesUseCase.execute(raceOption as string)

        const { attachment, name } = this.getRaceImage()

        return interaction.reply({
          embeds: this.buildEmbed(),
          files: [{ attachment, name }],
        })
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
          .addChoices(racesOption),
      )
  }
}
