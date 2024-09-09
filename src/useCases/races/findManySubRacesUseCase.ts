import { PrismaBaseSubRaceRepository } from '@/repositories/prisma/prismaBaseSubRaceRepository'
import { SubRace } from '@prisma/client'

export class FindManySubRacesUseCase {
  async execute(names: string[]): Promise<SubRace[]> {
    const prismaSubRaceRepository = new PrismaBaseSubRaceRepository()
    const subRaces = await prismaSubRaceRepository.findManyByName(names)

    return subRaces
  }
}
