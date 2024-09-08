import { InsertDefaultRacesAndSubRaces } from '@/utils/insertDefaultRaceData'
import { InMemoryBaseRaceRepository } from '@/repositories/inMemory/inMemoryBaseRaceRepository'
import { describe, expect, test, vi } from 'vitest'
import { InMemoryBaseSubRaceRepository } from '@/repositories/inMemory/inMemoryBaseSubRaceRepository.ts'
import { beforeEach } from 'node:test'
import { BaseRaceRepository } from '@/repositories/baseRaceRepository'
import { BaseSubRaceRepository } from '@/repositories/baseSubRaceRepository'
import { IRaceApiResponse, ISubRaceApiResponse, RacesApi } from '@/api/raceApi'

describe('insertDefaultRaceData', () => {
  let baseRaceRepository: BaseRaceRepository
  let baseSubRaceRepository: BaseSubRaceRepository
  let insertDefaultRacesAndSubRaces: InsertDefaultRacesAndSubRaces

  const mockRaceApiResponse: IRaceApiResponse = {
    name: 'elf',
    traits: [],
    speed: 30,
    ability_bonuses: [],
    languages: [{ index: 'common', name: 'Common', url: 'common.com' }],
    size: 'Medium',
    starting_proficiencies: [],
    index: 'elf',
    url: 'elf.com',
    subraces: [{ index: 'high-elf', name: 'High Elf', url: 'high-elf.com' }],
    alignment: 'Chaotic Good',
    age: '100',
    size_description: 'Medium',
    starting_proficiency_options: {
      choose: 1,
      from: [],
      type: 'proficiency',
    },
    language_desc: 'Common',
  }

  const mockSubRaceApiResponse: ISubRaceApiResponse = {
    name: 'elf',
    race: { index: 'elf', name: 'Elf', url: 'elf.com' },
    racial_traits: [],
    ability_bonuses: [],
    starting_proficiencies: [],
    index: 'elf',
    url: 'elf.com',
    language_options: {
      choose: 1,
      from: {
        option_set_type: 'languages',
        options: {
          item: [{ index: 'common', name: 'Common', url: 'common.com' }],
          option_type: 'languages',
        },
      },
      type: 'languages',
    },
    languages: [],
    desc: 'Elf',
    starting_proficiency_options: [],
  }
  const spyOnGetSpecifcRace = vi.spyOn(RacesApi.prototype, 'getSpecificRace')
  const spyOnGetSpecifcSubRace = vi.spyOn(
    RacesApi.prototype,
    'getSpecificSubRace',
  )

  beforeEach(async () => {
    baseRaceRepository = new InMemoryBaseRaceRepository()
    baseSubRaceRepository = new InMemoryBaseSubRaceRepository()
    insertDefaultRacesAndSubRaces = new InsertDefaultRacesAndSubRaces(
      baseRaceRepository,
      baseSubRaceRepository,
    )
    spyOnGetSpecifcRace.mockResolvedValue(mockRaceApiResponse)
    spyOnGetSpecifcSubRace.mockResolvedValue(mockSubRaceApiResponse)
  })

  test('should insert default race data', async () => {
    console.log('insertDefaultRacesAndSubRaces', insertDefaultRacesAndSubRaces)
    console.log('baseRaceRepository', baseRaceRepository)
    console.log('baseSubRaceRepository', baseSubRaceRepository)
    await insertDefaultRacesAndSubRaces.insertDefaultRaceData()

    expect(spyOnGetSpecifcRace).toHaveBeenCalledTimes(1)
    expect(spyOnGetSpecifcSubRace).toHaveBeenCalledTimes(1)
  })
})
