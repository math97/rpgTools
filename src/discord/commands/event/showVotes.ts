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

        const { attachment, name } = this.getEventImage()

        return interaction.reply({
          embeds: this.buildEmbed(),
          files: [{ attachment, name }],
        })
      },
    }
  }

  public buildEmbed(): EmbedBuilder[] {
    const embedVotes = new EmbedBuilder()
      .setColor('DarkBlue')
      .setTitle('CONTAGEM')
      .setThumbnail('attachment://october.jpeg')
      .setDescription(`Contagem de pontos do evento de Outubro`)
      .addFields({ name: 'Contagem total:', value: this.data.total.toString() })
      .addFields({
        name: ':cherry_blossom: Pétalas :cherry_blossom:',
        value: this.data.kitsuneVotes.toString(),
      })
      .addFields({
        name: ':drop_of_blood: Lágrimas :drop_of_blood:',
        value: this.data.yokaiVotes.toString(),
      })

    return [embedVotes]
  }

  private command(): SlashCommandOptionsOnlyBuilder {
    return new SlashCommandBuilder()
      .setName(this.name?.toLowerCase() ?? '')
      .setDescription('Show total of votes !')
  }

  public getEventImage(): { attachment: string; name: string } {
    return {
      attachment: `src/assets/event/october.jpeg`,
      name: 'october.jpeg',
    }
  }
}
