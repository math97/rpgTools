import { Command as CommandType } from '@/models/Command'
import {
  CommandInteraction,
  InteractionResponse,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from 'discord.js'
import { Command } from '../index'
import { PrismaGuildRepository } from '@/repositories/prisma/prismaGuildRepository'
import { PrismaCustomEventRepository } from '@/repositories/prisma/prismaCustomEventRepository'

export class CreateEventCommand extends Command<string> {
  protected data: string

  constructor(name: string) {
    super(name)
    this.name = name ?? 'CreateEvent'
    this.data = ''
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
          return interaction.reply('This command is not available in DMs')
        }

        const guildRepository = PrismaGuildRepository.getGuildRepository()
        const eventRepository =
          PrismaCustomEventRepository.getCustomEventRepository()

        const guild = await guildRepository.findByGuildId(guildId)

        if (!guild?.customEventDiscord.length) {
          const event = await eventRepository.create({
            name: 'octoberEvent',
            kitsuneVotes: 0,
            yokaiVotes: 0,
            total: 0,
            guild: {
              connect: {
                guildId,
              },
            },
          })

          return interaction.reply(`Event created with id: ${event.name}`)
        }

        return interaction.reply('Event already exists')
      },
    }
  }

  private command(): SlashCommandOptionsOnlyBuilder {
    return new SlashCommandBuilder()
      .setName(this.name?.toLowerCase() ?? '')
      .setDescription('Create a new event!')
  }
}
