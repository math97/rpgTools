import { buildEmbedRace } from '@/discord/utils/buildEmbedRace'
import { BaseRaceWithRelations } from '@/repositories/prisma/prismaBaseRaceRepository'
import { AbilityScoreType, Size } from '@prisma/client'
import { randomUUID } from 'crypto'
import { EmbedBuilder } from 'discord.js'
import { describe, expect, it } from 'vitest'

describe('buildEmbedRace', () => {
  const race: BaseRaceWithRelations = {
    name: 'Elf',
    abilityScore: [
      {
        id: 'abilityScoreId',
        type: AbilityScoreType.DEX,
        value: 0,
        raceId: null,
        baseRaceId: null,
        subRaceId: null,
      },
    ],
    traits: ['Darkvision', 'Keen Senses'],
    languages: ['Common', 'Elvish'],
    proficienciesNumber: 2,
    proficiencies: [],
    id: randomUUID(),
    movementSpeed: 30,
    size: Size.MEDIUM,
    subRaces: [],
  }

  it('should return an instance of EmbedBuilder', () => {
    const result = buildEmbedRace(race)

    expect(result).toBeInstanceOf(EmbedBuilder)
  })

  it('should build the embed with the correct race information', () => {
    const result = buildEmbedRace(race)

    expect(result.data.title).toBe('Elf')
    expect(result.data.fields?.[0].name).toBe('Ability Score')
    expect(result.data.fields?.[1].name).toBe('Traits')
    expect(result.data.fields?.[2].name).toBe('Languages')
    expect(result.data.fields?.[3].name).toBe(
      'Number of proficiencies you can choose',
    )
    expect(result.data.fields?.[4].name).toBe('Proficiencies')
    expect(result.data.fields?.[5].name).toBe('Speed')
    expect(result.data.fields?.[6].name).toBe('Size')
    expect(result.data.fields?.[7].name).toBe('Subraces available')
    expect(result.data.fields?.[1].value).toBe('Darkvision\nKeen Senses')
    expect(result.data.fields?.[2].value).toBe('Common,Elvish')
    expect(result.data.fields?.[3].value).toBe('2')
  })
})
