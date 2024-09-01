import { CharacterClass } from '@/models/CharacterClass'
import { EmbedBuilder } from 'discord.js'
import { expect, it, describe } from 'vitest'
import { buildEmbedRole } from './buildEmbedRole'

describe('buildEmbedRole', () => {
  const characterClass: CharacterClass = {
    className: 'Test class',
    image:
      'https://cdn.discordapp.com/attachments/1279212787372916817/1279265162595012774/Z.png?ex=66d3d006&is=66d27e86&hm=96823b7fdc8205f48a5fe9bfa052f309d2832b38429dab9305e431aed52f95b6&',
    baseStats: {
      lifeDice: 'd8',
      proficiencies: ['test Armor', 'test Weapons'],
      modify: 'Test',
      expertise: ['Tester', 'Testing', 'Debugging', 'Survival'],
      expertiseChoices: 2,
      savingThrows: ['Strength', 'Constitution'],
      armor: 'Medium Armor',
    },
    levels: [
      { level: 1, features: ['test1'] },
      { level: 2, features: ['test2'] },
    ],
  }
  it('should return an instance of EmbedBuilder', () => {
    const result = buildEmbedRole(characterClass)

    expect(result).toBeInstanceOf(EmbedBuilder)
  })

  it('should build the embed with the correct class information', () => {
    const result = buildEmbedRole(characterClass)

    expect(result.data.title).toBe('Test class')
    expect(result.data.fields?.[0]?.name).toBe('Life Dice')
    expect(result.data.fields?.[0]?.value).toBe(
      characterClass.baseStats.lifeDice,
    )
    expect(result.data.fields?.[0]?.inline).toBe(true)
    expect(result.data.fields?.[1]?.inline).toBe(true)
  })
})
