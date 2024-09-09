import { IRaceApiResponse, RacesApi } from '@/api/raceApi'
import { DefaultRaces, defaultRacesType } from '@/models/Races'

export class GetRacesApiUseCase {
  async execute(raceName: string): Promise<IRaceApiResponse> {
    const isDefaultRace =
      DefaultRaces[raceName.toUpperCase() as defaultRacesType]

    const racesApi = new RacesApi()
    const raceDetails = await racesApi.getSpecificRace(isDefaultRace)

    return raceDetails
  }
}
