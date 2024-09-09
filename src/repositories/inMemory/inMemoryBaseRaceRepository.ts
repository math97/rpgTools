import { Prisma, BaseRace } from '@prisma/client'
import { BaseRaceRepository } from '../baseRaceRepository'
import { randomUUID } from 'crypto'
import { BaseRaceWithRelations } from '../prisma/prismaBaseRaceRepository'

export class InMemoryBaseRaceRepository implements BaseRaceRepository {
  public baseRaces: BaseRace[] = []

  async create(data: Prisma.BaseRaceCreateInput): Promise<BaseRace> {
    const race: BaseRace = {
      id: randomUUID(),
      name: data.name,
      languages: data.languages as string[],
      movementSpeed: data.movementSpeed,
      traits: data.traits as string[],
      proficienciesNumber: data.proficienciesNumber,
      proficiencies: data.proficiencies as string[],
      ...(data.abilityScore && { abilityScore: data.abilityScore }),
      size: data.size,
      ...(data.subRaces && { subRaces: data.subRaces }),
    }
    this.baseRaces.push(race)

    return race
  }

  async findRaceByName(name: string): Promise<BaseRaceWithRelations | null> {
    return this.baseRaces.filter(
      (race) => race.name === name,
    )[0] as BaseRaceWithRelations
  }
}
