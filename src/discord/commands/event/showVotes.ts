import { Command as CommandType } from '@/models/Command'
import {
  CommandInteraction,
  EmbedBuilder,
  InteractionResponse,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from 'discord.js'
import { Command } from '../index'
import { PrismaCustomEventRepository } from '@/repositories/prisma/prismaCustomEventRepository'
import { CustomEventDiscord } from '@prisma/client'
import { PrismaGuildRepository } from '@/repositories/prisma/prismaGuildRepository'

export class ShowVotesCommand extends Command<string> {
  protected data: CustomEventDiscord

  constructor(name: string) {
    super(name)
    this.name = name ?? 'ShowVotes'
    this.data = {} as CustomEventDiscord
  }

  public buildCommand(): CommandType {
    return {
      name: this.name?.toLowerCase() ?? '',
      data: this.command(),
      execute: async (
        interaction: CommandInteraction,
      ): Promise<InteractionResponse | void> => {
        const guildId = interaction.guildId

        if (!guildId) {
          return interaction.reply('Falta guild parametro')
        }

        const eventRepository =
          PrismaCustomEventRepository.getCustomEventRepository()
        const guildRepository = PrismaGuildRepository.getGuildRepository()

        const guild = await guildRepository.findByGuildId(guildId)

        if (!guild) {
          return interaction.reply('Guild not found')
        }

        const event = await eventRepository.getEventByNameAndGuildId(
          guild.id,
          'octoberEvent',
        )

        if (!event) {
          return interaction.reply('Event not found')
        }

        this.data = event

        return interaction.reply({ embeds: this.buildEmbed() })
      },
    }
  }

  public buildEmbed(): EmbedBuilder[] {
    const embedVotes = new EmbedBuilder()
      .setColor('DarkBlue')
      .setTitle('Votes')
      .setDescription(`Number of votes`)
      .addFields({ name: 'Total votes', value: this.data.total.toString() })
      .addFields({
        name: 'Kitsune votes',
        value: this.data.kitsuneVotes.toString(),
      })
      .addFields({
        name: 'Yokai votes',
        value: this.data.yokaiVotes.toString(),
      })

    return [embedVotes]
  }

  private command(): SlashCommandOptionsOnlyBuilder {
    return new SlashCommandBuilder()
      .setName(this.name?.toLowerCase() ?? '')
      .setDescription('Show total of votes !')
  }
}
