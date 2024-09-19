import { PrismaCustomRaceRepository } from '@/repositories/prisma/prismaCustomRaceRepository'
import { PrismaHomebrewRepository } from '@/repositories/prisma/prismaHomebrewRepository'
import { CreateCustomRaceUseCase } from '@/useCases/customRaces/createCustomRaceUseCase'
import { GetHomeBrewByGuildIdUseCase } from '@/useCases/homebrew/getHomeBrewByGuildIdUseCase'
import { CustomRace } from '@prisma/client'
import { ModalSubmitFields } from 'discord.js'
import { z } from 'zod'

const customRaceSchema = z.object({
  nameInput: z.string(),
  sizeInput: z.enum(['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan']),
  ageInput: z.string(),
  descriptionInput: z.string().optional(),
})
export type customRaceModalType = z.infer<typeof customRaceSchema>

export class CreateCustomRaceController {
  public async handler(
    data: ModalSubmitFields,
    guildId: string,
  ): Promise<CustomRace> {
    const customRaceRepository = new PrismaCustomRaceRepository()
    const homeBrewRepository = new PrismaHomebrewRepository()
    const customRaceUseCase = new CreateCustomRaceUseCase(customRaceRepository)
    const getHomeBrewByGuildIdUseCase = new GetHomeBrewByGuildIdUseCase(
      homeBrewRepository,
    )

    const customRaceModalData = this.getRaceData(data)

    const { id: homeBrewId } =
      await getHomeBrewByGuildIdUseCase.execute(guildId)

    console.log('homeBrewId', homeBrewId)

    const customRace = await customRaceUseCase.execute(
      customRaceModalData,
      homeBrewId,
    )

    return customRace
  }

  private getRaceData(data: ModalSubmitFields) {
    const nameInput = data.getTextInputValue('nameInput')
    const sizeInput = data.getTextInputValue('sizeInput')
    const ageInput = data.getTextInputValue('ageInput')
    const descriptionInput = data.getTextInputValue('descriptionInput')

    const customRaceModalData = customRaceSchema.parse({
      nameInput,
      sizeInput,
      ageInput,
      descriptionInput,
    })

    return customRaceModalData
  }
}
