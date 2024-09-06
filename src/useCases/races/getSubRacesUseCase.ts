import RacesApi, { ISubRaceApiResponse } from '@/api/raceApi'

export class GetSubRacesUseCase {
  async execute(subRaceName: string): Promise<ISubRaceApiResponse> {
    const racesApi = new RacesApi()
    const subRaceDetails = await racesApi.getSpecificSubRace(subRaceName)
    return subRaceDetails
  }
}
