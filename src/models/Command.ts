import {
  CommandInteraction,
  InteractionResponse,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from 'discord.js'

export interface Command {
  name: string
  data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder
  execute(interaction: CommandInteraction): Promise<InteractionResponse | void>
}
