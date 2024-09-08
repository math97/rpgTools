import { DefaultRaces } from '@/models/Races'
import { Prisma, SubRace } from '@prisma/client'
import { GetRacesApiUseCase } from '@/useCases/races/getRacesApiUseCase'
import { ISubRaceApiResponse, ISubRaces } from '@/api/raceApi'
import { PrismaBaseRaceRepository } from '@/repositories/prisma/prismaBaseRaceRepository'
import { GetSubRacesUseCase } from '@/useCases/races/getSubRacesUseCase'
import { PrismaBaseSubRaceRepository } from '@/repositories/prisma/prismaBaseSubRaceRepository'
import { TransformAndValidateRaceData } from './transformAndValidateRaceData'
import { BaseRaceRepository } from '@/repositories/baseRaceRepository'
import { BaseSubRaceRepository } from '@/repositories/baseSubRaceRepository'

export class InsertDefaultRacesAndSubRaces {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private baseRaceRepository: BaseRaceRepository,
    private subRaceRepository: BaseSubRaceRepository,
  ) {}

  public async insertDefaultRaceData() {
    const getRacesApiUseCase = new GetRacesApiUseCase()

    await Promise.all(
      Object.values(DefaultRaces).map(async (defaultRace) => {
        const race = await getRacesApiUseCase.execute(defaultRace)
        const hasSubRace = race.subraces.length > 0

        let baseRaceInput: Prisma.BaseRaceCreateInput

        if (hasSubRace) {
          const subRaces = hasSubRace && (await this.getSubRace(race.subraces))
          const subRacesId = await this.insertDefaultSubRaceData(subRaces)

          baseRaceInput =
            TransformAndValidateRaceData.transformIntoBaseRaceInput(
              race,
              subRacesId,
            )
        } else {
          baseRaceInput =
            TransformAndValidateRaceData.transformIntoBaseRaceInput(race)
        }
        await this.baseRaceRepository.create(baseRaceInput)
      }),
    )
  }

  private async insertDefaultSubRaceData(
    subRaces: ISubRaceApiResponse[],
  ): Promise<string[]> {
    const subRacePrisma = subRaces.map(
      TransformAndValidateRaceData.transformIntoSubRaceInput,
    )
    const subRacesResponse: SubRace[] = []

    await Promise.all(
      subRacePrisma.map(async (subRace) => {
        const subRaceResponse = await this.subRaceRepository.create(subRace)
        subRacesResponse.push(subRaceResponse)
      }),
    )

    const subRacesId = subRacesResponse.map((subRace) => subRace.id)

    return subRacesId
  }

  private async getSubRace(
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
}

;(async () => {
  const raceRepository = new PrismaBaseRaceRepository()
  const subRaceRepository = new PrismaBaseSubRaceRepository()

  const insertDefaultRacesAndSubRaces = new InsertDefaultRacesAndSubRaces(
    raceRepository,
    subRaceRepository,
  )

  insertDefaultRacesAndSubRaces.insertDefaultRaceData()
})()
