import { EmbedBuilder } from 'discord.js'
import {
  Command as CommandType,
  ModalCommandType,
} from './../../models/Command'

export abstract class Command<T> {
  protected name: T

  constructor(name: T) {
    this.name = name
  }

  public abstract buildCommand(): CommandType | ModalCommandType
}

export abstract class EmbedCommand<T> extends Command<T> {
  protected name: T

  constructor(name: T) {
    super(name)
    this.name = name
  }

  public abstract buildEmbed(): EmbedBuilder[]

  public abstract buildCommand(): CommandType | ModalCommandType
}
