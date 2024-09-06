import { DefaultRaces } from '@/models/Races'

export interface IstartingProficiencies {
  index: string
  url: string
  name: string
}
export interface IstartingProficienciesOption {
  choose: number
  from: string[]
  type: string
}

export interface Ilanguages {
  index: string
  name: string
  url: string
}

export interface ITraits {
  index: string
  name: string
  url: string
}

export interface IAbilityScore {
  index: string
  name: string
  url: string
}

export interface IAbilityBonuses {
  ability_score: IAbilityScore
  bonus: number
}

export interface ISubRaces {
  index: string
  name: string
  url: string
}

export interface IRaceApiResponse {
  index: string
  name: string
  speed: number
  ability_bonuses: IAbilityBonuses[]
  alignment: string
  age: string
  size: string
  size_description: string
  starting_proficiencies: IstartingProficiencies[]
  starting_proficiency_options: IstartingProficienciesOption
  languages: Ilanguages[]
  language_desc: string
  traits: ITraits[]
  subraces: ISubRaces[]
  url: string
}

export interface ISubRaceApiResponse {
  index: string
  name: string
  race: {
    index: string
    name: string
    url: string
  }
  desc: string
  ability_bonuses: IAbilityBonuses[]
  starting_proficiencies: {
    index: string
    name: string
    url: string
  }[]
  starting_proficiency_options: {
    choose: number
    from: {
      index: string
      name: string
      url: string
    }[]
    type: string
  }
  languages: []
  language_options: {
    choose: number
    from: {
      index: string
      name: string
      url: string
    }[]
    type: string
  }
  racial_traits: {
    index: string
    name: string
    url: string
  }[]
  url: string
}

class RacesApi {
  private headers: Headers
  private requestOptions: RequestInit
  constructor() {
    this.headers = new Headers()
    this.headers.append('Accept', 'application/json')
    this.requestOptions = {
      method: 'GET',
      headers: this.headers,
      redirect: 'follow',
    }
  }

  async getSpecificRace(race: DefaultRaces): Promise<IRaceApiResponse> {
    const url = `https://www.dnd5eapi.co/api/races/${race}`
    const response = await fetch(url, this.requestOptions)
    const data: IRaceApiResponse = Object.assign(await response.json())
    return data
  }

  async getSpecificSubRace(subRaceName: string): Promise<ISubRaceApiResponse> {
    const url = `https://www.dnd5eapi.co/api/subraces/${subRaceName}`
    const response = await fetch(url, this.requestOptions)
    const data: ISubRaceApiResponse = Object.assign(await response.json())
    return data
  }
}

export default RacesApi
