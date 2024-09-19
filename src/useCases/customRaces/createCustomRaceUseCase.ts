import { customRaceModalType } from '@/controllers/createCustomRaceController'
import { CustomRaceRepository } from '@/repositories/customRaceRepository'
import { CustomRace, Prisma, Size } from '@prisma/client'

export class CreateCustomRaceUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private customRaceRepository: CustomRaceRepository) {}
  async execute(
    data: customRaceModalType,
    homeBrewId: string,
  ): Promise<CustomRace> {
    const customRaceInput = this.transformModalDataIntoCustomRace(
      data,
      homeBrewId,
    )
    const customRace = await this.customRaceRepository.create(customRaceInput)

    return customRace
  }

  private transformModalDataIntoCustomRace(
    data: customRaceModalType,
    homeBrewId: string,
  ): Prisma.CustomRaceCreateInput {
    const { nameInput, ageInput, sizeInput, descriptionInput } = data

    const customRace: Prisma.CustomRaceCreateInput = {
      name: nameInput,
      ...(descriptionInput && { description: descriptionInput }),
      age: ageInput,
      size: Size[sizeInput.toUpperCase() as keyof typeof Size],
      homeBrew: {
        connect: {
          id: homeBrewId,
        },
      },
    }

    return customRace
  }
}
