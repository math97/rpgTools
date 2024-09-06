import { DefaultRaces } from '@/models/Races'
import { Prisma, SubRace } from '@prisma/client'
import { GetRacesUseCase } from '@/useCases/races/getRacesUseCase'
import { ISubRaceApiResponse, ISubRaces } from '@/api/raceApi'
import { PrismaBaseRaceRepository } from '@/repositories/prisma/prismaBaseRaceRepository'
import { GetSubRacesUseCase } from '@/useCases/races/getSubRacesUseCase'
import { PrismaBaseSubRaceRepository } from '@/repositories/prisma/prismaBaseSubRaceRepository'
import { TransformAndValidateRaceData } from './transformAndValidateRaceData'

class InsertDefaultRacesAndSubRaces {
  public static async handle() {
    await this.insertDefaultRaceData()
  }

  private static async insertDefaultRaceData() {
    const getRacesUseCase = new GetRacesUseCase()
    const raceRepository = new PrismaBaseRaceRepository()

    await Promise.all(
      Object.values(DefaultRaces).map(async (defaultRace) => {
        const race = await getRacesUseCase.execute(defaultRace)
        const hasSubRace = race.subraces.length > 0

        let baseRaceInput: Prisma.BaseRaceCreateInput

        if (hasSubRace) {
          const subRaces = hasSubRace && (await getSubRace(race.subraces))
          const subRacesId = await this.insertDefaultSubRaceData(subRaces)

          console.log('subRacesId', subRacesId)

          baseRaceInput =
            TransformAndValidateRaceData.transformIntoBaseRaceInput(
              race,
              subRacesId,
            )
        } else {
          baseRaceInput =
            TransformAndValidateRaceData.transformIntoBaseRaceInput(race)
        }
        await raceRepository.create(baseRaceInput)
      }),
    )
  }

  private static async insertDefaultSubRaceData(
    subRaces: ISubRaceApiResponse[],
  ): Promise<string[]> {
    const subRaceRepository = new PrismaBaseSubRaceRepository()

    const subRacePrisma = subRaces.map(
      TransformAndValidateRaceData.transformIntoSubRaceInput,
    )
    const subRacesResponse: SubRace[] = []

    await Promise.all(
      subRacePrisma.map(async (subRace) => {
        const subRaceResponse = await subRaceRepository.create(subRace)
        subRacesResponse.push(subRaceResponse)
      }),
    )

    const subRacesId = subRacesResponse.map((subRace) => subRace.id)

    return subRacesId
  }
}

async function getSubRace(
  subRaces: ISubRaces[],
): Promise<ISubRaceApiResponse[]> {
  const getSubRacesUseCase = new GetSubRacesUseCase()

  const subRacesResponse: ISubRaceApiResponse[] = []

  for (const subRace of subRaces) {
    const subRaceDetails = await getSubRacesUseCase.execute(subRace.index)
    subRacesResponse.push(subRaceDetails)
  }

  return subRacesResponse
}

;(async () => {
  InsertDefaultRacesAndSubRaces.handle()
})()
