import { buildEmbedRace } from '@/discord/utils/buildEmbedRace'
import { Race } from '@/models/Races'
import { EmbedBuilder } from 'discord.js'
import { describe, expect, it } from 'vitest'

describe('buildEmbedRace', () => {
  const race: Race = {
    name: 'Elf',
    abilityScore: 'Dexterity',
    traits: ['Darkvision', 'Keen Senses'],
    languages: ['Common', 'Elvish'],
    proficiencies: 2,
  }

  it('should return an instance of EmbedBuilder', () => {
    const result = buildEmbedRace(race)

    expect(result).toBeInstanceOf(EmbedBuilder)
  })

  it('should build the embed with the correct race information', () => {
    const result = buildEmbedRace(race)

    expect(result.data.title).toBe('Elf')
    expect(result.data.fields?.[1].name).toBe('abilityScore')
    expect(result.data.fields?.[1].value).toBe('Dexterity')
    expect(result.data.fields?.[2].name).toBe('traits')
    expect(result.data.fields?.[2].value).toBe('Darkvision\nKeen Senses')
    expect(result.data.fields?.[3].name).toBe('languages')
    expect(result.data.fields?.[3].value).toBe('Common, Elvish')
    expect(result.data.fields?.[4].name).toBe('proficiencies')
    expect(result.data.fields?.[4].value).toBe('2')
  })
})
