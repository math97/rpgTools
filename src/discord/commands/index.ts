import { Command } from '@/models/Command'
import { EmbedBuilder } from 'discord.js'

export abstract class commandClass<T> {
  protected name: T | undefined

  constructor(name?: T) {
    this.name = name
  }

  public abstract buildEmbed(): EmbedBuilder[]

  public abstract buildCommand(): Command
}
