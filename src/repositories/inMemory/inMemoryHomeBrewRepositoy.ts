import { Prisma, HomeBrew } from '@prisma/client'
import { randomUUID } from 'crypto'
import { HomebrewRepository } from '../homebrewRepository'

export class InMemoryHomeBrewRepository implements HomebrewRepository {
  public homeBrews: HomeBrew[] = []

  async create(data: Prisma.HomeBrewCreateInput): Promise<HomeBrew> {
    const homeBrew: HomeBrew = {
      id: randomUUID(),
      guildId: data.guild.connect?.id as string,
      name: data.name,
      description: data.description,
    }
    this.homeBrews.push(homeBrew)

    return homeBrew
  }

  async findByGuildId(guildId: string): Promise<HomeBrew | null> {
    const homeBrew = this.homeBrews.filter(
      (homeBrew) => homeBrew.guildId === guildId,
    )[0]

    if (!homeBrew) throw new Error('Homebrew not found')

    return homeBrew
  }
}
