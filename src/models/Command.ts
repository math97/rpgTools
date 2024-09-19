import {
  CommandInteraction,
  InteractionResponse,
  ModalSubmitInteraction,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from 'discord.js'

export interface Command {
  name: string
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder
  execute(interaction: CommandInteraction): Promise<InteractionResponse | void>
}

export interface ModalCommandType {
  name: string
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder
  execute(
    interaction: ModalSubmitInteraction,
  ): Promise<InteractionResponse | void>
}
