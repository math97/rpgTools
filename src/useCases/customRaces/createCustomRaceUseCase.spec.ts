import { describe, it, expect } from 'vitest'
import { CreateCustomRaceUseCase } from './createCustomRaceUseCase'
import { Prisma, Size, AbilityScoreType } from '@prisma/client'
import { InMemoryCustomRaceRepository } from '@/repositories/inMemory/inMemoryCustomRaceRepository'
import { angelRaceMock } from '@/mock/RaceMock'

describe('CreateCustomRaceUseCase', () => {
  it('should create a custom race successfully', async () => {
    const mockCustomRace: Prisma.CustomRaceCreateInput = {
      name: angelRaceMock.raceName,
      description: 'any description',
      languages: angelRaceMock.languaguesInput,
      size: Size[
        angelRaceMock.physicalAtributesInput.size as keyof typeof Size
      ],
      movementSpeed: Number(angelRaceMock.physicalAtributesInput.movementSpeed),
      traits: {
        create: angelRaceMock.traitsInput.map((trait) => ({
          name: trait.name,
          description: trait.description,
        })),
      },
      abilityScore: {
        create: Object.keys(angelRaceMock.abilityScoreInput).map(
          (abilityScoreKey) => {
            let abilityScoreType: AbilityScoreType
            switch (abilityScoreKey) {
              case 'strength':
                abilityScoreType = AbilityScoreType.STR
                break
              case 'dexterity':
                abilityScoreType = AbilityScoreType.DEX
                break
              case 'constitution':
                abilityScoreType = AbilityScoreType.CON
                break
              case 'intelligence':
                abilityScoreType = AbilityScoreType.INT
                break
              case 'wisdom':
                abilityScoreType = AbilityScoreType.WIS
                break
              case 'charisma':
                abilityScoreType = AbilityScoreType.CHA
                break
              default:
                abilityScoreType = AbilityScoreType.STR
            }
            return {
              type: abilityScoreType,
              value:
                angelRaceMock.abilityScoreInput[
                  abilityScoreKey as keyof typeof angelRaceMock.abilityScoreInput
                ],
            }
          },
        ),
      },
      proficienciesNumber: 0,
      proficiencies: [],
    }

    const customRaceRepository = new InMemoryCustomRaceRepository()

    const createCustomRaceUseCase = new CreateCustomRaceUseCase(
      customRaceRepository,
    )
    const result = await createCustomRaceUseCase.execute(mockCustomRace)

    expect(result.name).toEqual(mockCustomRace.name)
  })
})
