import { CustomRace, Prisma } from '@prisma/client'
import { CustomRaceRepository } from '../customRaceRepository'
import { randomUUID } from 'crypto'

export class InMemoryCustomRaceRepository implements CustomRaceRepository {
  private races: CustomRace[] = []

  async create(data: Prisma.CustomRaceCreateInput): Promise<CustomRace> {
    const race: CustomRace = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description,
      languages: data.languages as string[],
      movementSpeed: data.movementSpeed,
      ...(data.traits && { traits: data.traits }),
      proficienciesNumber: data.proficienciesNumber,
      proficiencies: data.proficiencies as string[],
      ...(data.abilityScore && { abilityScore: data.abilityScore }),
      size: data.size,
      homeBrewId: randomUUID(),
      flySpeed: data.flySpeed || 0,
    }
    this.races.push(race)

    return race
  }
}
