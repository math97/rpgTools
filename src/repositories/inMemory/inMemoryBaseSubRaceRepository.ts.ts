import { Prisma, SubRace } from '@prisma/client'
import { randomUUID } from 'crypto'
import { BaseSubRaceRepository } from '../baseSubRaceRepository'

export class InMemoryBaseSubRaceRepository implements BaseSubRaceRepository {
  public subRaces: SubRace[] = []

  async create(data: Prisma.SubRaceCreateInput): Promise<SubRace> {
    const subRace: SubRace = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      languages: data.languages as string[],
      traits: data.traits as string[],
      proficienciesNumber: data.proficienciesNumber,
      proficiencies: data.proficiencies as string[],
      ...(data.abilityScore && { abilityScore: data.abilityScore }),
      ...(data.BaseRace && { subRaces: data.BaseRace }),
      baseRaceId: null,
    }

    this.subRaces.push(subRace)

    return subRace
  }

  async findManyByName(names: string[]): Promise<SubRace[]> {
    const subRaces = this.subRaces.filter((subRace) =>
      names.includes(subRace.name),
    )
    return subRaces
  }
}
