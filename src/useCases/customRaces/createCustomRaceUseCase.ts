import { CustomRaceRepository } from '@/repositories/customRaceRepository'
import { CustomRace, Prisma } from '@prisma/client'

export class CreateCustomRaceUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private customRaceRepository: CustomRaceRepository) {}
  async execute(data: Prisma.CustomRaceCreateInput): Promise<CustomRace> {
    const customRace = await this.customRaceRepository.create(data)

    return customRace
  }
}
