import { Command } from '@/models/Command'
import { EmbedBuilder } from 'discord.js'

export abstract class commandClass<T> {
  protected info: T | undefined

  constructor(info?: T) {
    this.info = info
  }

  public abstract buildEmbed(): EmbedBuilder[]

  public abstract buildCommand(): Command
}
