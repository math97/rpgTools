import { TransformAndValidateRaceData } from '@/utils/transformAndValidateRaceData'
import {
  IRaceApiResponse,
  ISubRaceApiResponse,
  IstartingProficiencies,
  Ilanguages,
  ITraits,
} from '@/api/raceApi'
import { Size } from '@prisma/client'
import { describe, expect, it } from 'vitest'

describe('TransformAndValidateRaceData', () => {
  describe('getSize', () => {
    it('should return the correct Size based on the input string', () => {
      const size = TransformAndValidateRaceData.getSize('Medium')
      expect(size).toBe(Size.MEDIUM)
    })
  })

  describe('getProficiencies', () => {
    it('should return an array of proficiency names based on the input starting proficiencies', () => {
      const proficiencies: IstartingProficiencies[] = [
        {
          name: 'Sword Proficiency',
          index: 'Sword Proficiency',
          url: 'test/Sword Proficiency',
        },
        {
          name: 'Shield Proficiency',
          index: 'Shield Proficiency',
          url: 'test/Shield Proficiency',
        },
      ]
      const result =
        TransformAndValidateRaceData.getProficiencies(proficiencies)
      expect(result).toEqual(['Sword Proficiency', 'Shield Proficiency'])
    })
  })

  describe('getLanguages', () => {
    it('should return an array of language names based on the input languages', () => {
      const languages: Ilanguages[] = [
        { name: 'Common', index: 'common', url: '/test/url' },
        { name: 'Elvish', index: 'elvish', url: '/test/url' },
      ]
      const result = TransformAndValidateRaceData.getLanguages(languages)
      expect(result).toEqual(['Common', 'Elvish'])
    })
  })

  describe('getTraits', () => {
    it('should return an array of trait names based on the input traits', () => {
      const traits: ITraits[] = [
        { name: 'Darkvision', index: 'darkvision', url: '/test/url' },
        { name: 'Fey Ancestry', index: 'fey ancestry', url: '/test/url' },
      ]
      const result = TransformAndValidateRaceData.getTraits(traits)
      expect(result).toEqual(['Darkvision', 'Fey Ancestry'])
    })
  })

  describe('transformIntoBaseRaceInput', () => {
    it('should transform the race and subraces data into Prisma.BaseRaceCreateInput', () => {
      const race: IRaceApiResponse = {
        name: 'Human',
        size: 'Medium',
        url: '/test/url',
        index: 'raceIndex',
        speed: 30,
        ability_bonuses: [],
        language_desc: 'languageDesc',
        alignment: 'alignment',
        age: 'age',
        size_description: 'sizeDescription',
        starting_proficiency_options: {
          choose: 1,
          from: ['Proficiency 1', 'Proficiency 2'],
          type: 'type',
        },
        starting_proficiencies: [
          { name: 'Sword Proficiency', index: 'common', url: '/test/url' },
        ],
        languages: [{ name: 'Common', index: 'common', url: '/test/url' }],
        traits: [
          {
            name: 'Trait 1',
            url: 'trait1Url',
            index: 'trait1Index',
          },
          {
            name: 'Trait 2',
            url: 'trait2Url',
            index: 'trait2Index',
          },
        ],
        subraces: [],
      }

      const subracesId = ['subrace1', 'subrace2']
      const result = TransformAndValidateRaceData.transformIntoBaseRaceInput(
        race,
        subracesId,
      )
      expect(result).toEqual({
        name: 'Human',
        languages: ['Common'],
        movementSpeed: 30,
        size: Size.MEDIUM,
        proficiencies: ['Sword Proficiency'],
        proficienciesNumber: 1,
        abilityScore: { createMany: { data: [] } },
        traits: ['Trait 1', 'Trait 2'],
        subRaces: { connect: [{ id: 'subrace1' }, { id: 'subrace2' }] },
      })
    })
  })

  describe('transformIntoSubRaceInput', () => {
    it('should transform the subrace data into Prisma.SubRaceCreateInput', () => {
      const subRace: ISubRaceApiResponse = {
        name: 'High Elf',
        index: 'high-elf',
        desc: 'High Elf Description',
        ability_bonuses: [],
        language_options: {
          choose: 1,
          from: {
            option_set_type: 'type',
            options: {
              option_type: 'type',
              item: [
                {
                  index: 'language1',
                  name: 'Language 1',
                  url: 'language1Url',
                },
              ],
            },
          },
          type: 'type',
        },
        starting_proficiency_options: [
          {
            choose: 1,
            from: ['Bow Proficiency'],
            type: 'type',
          },
        ],
        race: { index: 'elf', name: 'Elf', url: '/test/url' },
        starting_proficiencies: [
          { name: 'Bow Proficiency', index: 'bow', url: '/test/url' },
        ],
        languages: [],
        racial_traits: [
          { name: 'Cantrip', index: 'cantrip', url: '/test/url' },
        ],
        url: '/test/url',
      }
      const result =
        TransformAndValidateRaceData.transformIntoSubRaceInput(subRace)
      expect(result).toEqual({
        name: 'High Elf',
        description: 'High Elf Description',
        abilityScore: { createMany: { data: [] } },
        proficienciesNumber: 1,
        proficiencies: ['Bow Proficiency'],
        traits: ['Cantrip'],
      })
    })
  })
})
