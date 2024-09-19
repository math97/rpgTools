import { ModalCommandType } from '@/models/Command'
import {
  EmbedBuilder,
  InteractionResponse,
  ModalSubmitInteraction,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from 'discord.js'
import { EmbedCommand } from '../index'
import { CreateCustomRaceController } from '@/controllers/createCustomRaceController'
import { CustomRace } from '@prisma/client'

export class SaveCustomRace extends EmbedCommand<string> {
  protected data: CustomRace

  constructor(name: string) {
    super(name)
    this.name = name ?? 'SaveCustomRace'
    this.data = {} as CustomRace
  }

  public buildCommand(): ModalCommandType {
    return {
      name: this.name?.toLowerCase() ?? '',
      data: this.command(),
      execute: async (
        interaction: ModalSubmitInteraction,
      ): Promise<InteractionResponse | void> => {
        const createCustomRaceController = new CreateCustomRaceController()
        const guildId = interaction.guildId

        if (!guildId) throw new Error('GuildId not found')

        const customRace = await createCustomRaceController.handler(
          interaction.fields,
          guildId,
        )

        this.data = customRace

        return interaction.reply({
          embeds: this.buildEmbed(),
        })
      },
    }
  }

  private command(): SlashCommandOptionsOnlyBuilder {
    return new SlashCommandBuilder()
      .setName(this.name?.toLowerCase() ?? '')
      .setDescription('Replies with form to fill a new Race!')
  }

  public buildEmbed(): EmbedBuilder[] {
    const raceEmbed = new EmbedBuilder()
      .setColor('DarkBlue')
      .setTitle(this.data.name)
      .setDescription(`Characteristics of race ${this.data.name}`)
      .addFields(
        {
          name: 'Description',
          value: this.data.description
            ? this.data.description
            : 'No description',
          inline: true,
        },
        {
          name: 'Age',
          value: this.data.age,
          inline: true,
        },
        {
          name: 'Size',
          value: this.data.size,
          inline: true,
        },
      )

    return [raceEmbed]
  }
}
