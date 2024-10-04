import { Command as CommandType } from '@/models/Command'
import {
  CommandInteraction,
  InteractionResponse,
  PermissionFlagsBits,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from 'discord.js'
import { Command } from '../index'
import { PrismaCustomEventRepository } from '@/repositories/prisma/prismaCustomEventRepository'
import { PrismaGuildRepository } from '@/repositories/prisma/prismaGuildRepository'

export class AddVoteCommand extends Command<string> {
  protected data: string

  constructor(name: string) {
    super(name)
    this.name = name ?? 'AddVote'
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

        const typeVote = interaction.options.get('typevote')?.value?.toString()
        const votes = interaction.options.get('votes')?.value?.toString()

        if (!guildId || !typeVote || !votes) {
          return interaction.reply('Falta parametros')
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

        const updatedEvent = structuredClone(event)

        if (typeVote === 'kitsune') {
          updatedEvent.kitsuneVotes += parseInt(votes)
        } else if (typeVote === 'yokai') {
          updatedEvent.yokaiVotes += parseInt(votes)
        }

        updatedEvent.total = updatedEvent.kitsuneVotes + updatedEvent.yokaiVotes

        await eventRepository.update(updatedEvent)

        return interaction.reply('Voto registrado com sucesso!')
      },
    }
  }

  private command(): SlashCommandOptionsOnlyBuilder {
    return new SlashCommandBuilder()
      .setName(this.name?.toLowerCase() ?? '')
      .setDescription('Add a new Vote!')
      .addStringOption((option) =>
        option
          .setName('typevote')
          .setDescription('For which race is this vote?')
          .setRequired(true)
          .addChoices([
            { name: 'Kitsune', value: 'kitsune' },
            { name: 'Yokai', value: 'yokai' },
          ]),
      )
      .addIntegerOption((option) =>
        option
          .setName('votes')
          .setDescription('How many votes?')
          .setRequired(true),
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
  }
}
