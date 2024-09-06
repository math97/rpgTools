import {
  Ilanguages,
  IRaceApiResponse,
  IstartingProficiencies,
  ISubRaceApiResponse,
  ITraits,
} from '@/api/raceApi'
import { AbilityScoreType, Prisma, Size } from '@prisma/client'

export class TransformAndValidateRaceData {
  static getSize(size: string): Size {
    return Size[size.toUpperCase() as keyof typeof Size]
  }

  static getProficiencies(proficiencies: IstartingProficiencies[]): string[] {
    return proficiencies.map((proficiency) => proficiency.name) || ['NONE']
  }

  static getLanguages(languages: Ilanguages[]): string[] {
    return (
      languages?.map((language) => {
        return language.name
      }) || ['NONE']
    )
  }

  static getTraits(traits: ITraits[]): string[] {
    return traits.map((trait) => trait.name) || ['NONE']
  }

  static transformIntoBaseRaceInput(
    race: IRaceApiResponse,
    subracesId?: string[],
  ): Prisma.BaseRaceCreateInput {
    console.log('subracesId', subracesId)
    const subsRaceIdConnect =
      subracesId &&
      subracesId?.map((id) => {
        return { id }
      })

    console.log('subsRaceIdConnect', subsRaceIdConnect)

    const baseRace: Prisma.BaseRaceCreateInput = {
      name: race.name,
      languages: this.getLanguages(race.languages),
      movementSpeed: race.speed,
      size: this.getSize(race.size),
      proficiencies: this.getProficiencies(race.starting_proficiencies),
      proficienciesNumber: race.starting_proficiency_options?.choose || 0,
      abilityScore: {
        createMany: {
          data: race.ability_bonuses?.map((abilityBonus) => ({
            type: abilityBonus.ability_score.name as AbilityScoreType,
            value: abilityBonus.bonus,
          })),
        },
      },
      traits: this.getTraits(race.traits),
      ...(subsRaceIdConnect && {
        subRaces: { connect: subsRaceIdConnect },
      }),
    }
    return baseRace
  }

  static transformIntoSubRaceInput(
    subRace: ISubRaceApiResponse,
  ): Prisma.SubRaceCreateInput {
    const subRaceInput: Prisma.SubRaceCreateInput = {
      name: subRace.name,
      description: subRace.desc,
      abilityScore: {
        createMany: {
          data: subRace.ability_bonuses?.map((abilityBonus) => ({
            type: abilityBonus.ability_score.name as AbilityScoreType,
            value: abilityBonus.bonus,
          })),
        },
      },
      proficienciesNumber: subRace.starting_proficiency_options?.choose || 0,
      proficiencies: subRace.starting_proficiencies?.map(
        (proeficiency) => proeficiency.name,
      ) || ['NONE'],
      traits: subRace.racial_traits?.map((trait) => trait.name) || ['NONE'],
    }
    return subRaceInput
  }
}
