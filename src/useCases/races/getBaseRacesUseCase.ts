import { BaseRaceRepository } from '@/repositories/baseRaceRepository'
import { BaseRaceWithRelations } from '@/repositories/prisma/prismaBaseRaceRepository'

export class GetBaseRacesUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private baseRaceRepository: BaseRaceRepository) {}

  async execute(name: string): Promise<BaseRaceWithRelations> {
    const race = await this.baseRaceRepository.findRaceByName(name)

    if (!race) throw new Error('Race not found')

    return race
  }
}
