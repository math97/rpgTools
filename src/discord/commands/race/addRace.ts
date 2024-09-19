import { Command as CommandType } from '@/models/Command'
import {
  ActionRowBuilder,
  CommandInteraction,
  InteractionResponse,
  ModalBuilder,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js'
import { Command } from '../index'

export class AddRaceCommand extends Command<string> {
  protected data: string

  constructor(name: string) {
    super(name)
    this.name = name ?? 'AddRace'
    this.data = ''
  }

  public buildCommand(): CommandType {
    return {
      name: this.name?.toLowerCase() ?? '',
      data: this.command(),
      execute: async (
        interaction: CommandInteraction,
      ): Promise<InteractionResponse | void> => {
        const modal = this.buildModal()
        await interaction.showModal(modal)
      },
    }
  }

  private command(): SlashCommandOptionsOnlyBuilder {
    return new SlashCommandBuilder()
      .setName(this.name?.toLowerCase() ?? '')
      .setDescription('Replies with form to fill a new Race!')
  }

  public buildModal(): ModalBuilder {
    const modal = new ModalBuilder()
      .setCustomId('addRaceModalData')
      .setTitle('HomeBrew Race Form')

    const raceNameInput = new TextInputBuilder()
      .setCustomId('nameInput')
      .setLabel("Add the race's name")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder('Elf')
      .setRequired(true)

    const sizeInput = new TextInputBuilder()
      .setCustomId('sizeInput')
      .setLabel('Add the size:[Small, Medium, Large]...')
      .setStyle(TextInputStyle.Short)
      .setPlaceholder(`They can live until 1000 years old`)
      .setRequired(true)

    const ageInput = new TextInputBuilder()
      .setCustomId('ageInput')
      .setLabel('Add the age')
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder(`They can live until 1000 years old`)
      .setRequired(true)

    const descriptionInput = new TextInputBuilder()
      .setCustomId('descriptionInput')
      .setLabel('Add the description')
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder('They are known for their wisdom and magic')
      .setRequired(false)

    const raceNameActionRow: ActionRowBuilder<TextInputBuilder> =
      new ActionRowBuilder<TextInputBuilder>().addComponents(raceNameInput)
    const sizeActionRow: ActionRowBuilder<TextInputBuilder> =
      new ActionRowBuilder<TextInputBuilder>().addComponents(sizeInput)
    const ageInputActionRow: ActionRowBuilder<TextInputBuilder> =
      new ActionRowBuilder<TextInputBuilder>().addComponents(ageInput)
    const descriptionActionRow: ActionRowBuilder<TextInputBuilder> =
      new ActionRowBuilder<TextInputBuilder>().addComponents(descriptionInput)

    modal.addComponents(
      raceNameActionRow,
      sizeActionRow,
      ageInputActionRow,
      descriptionActionRow,
    )

    return modal
  }
}
