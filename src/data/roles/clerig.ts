import { clericClass } from '@/models/CharacterClass'

export const clerig: clericClass = {
  className: 'Clerig',
  image:
    'https://cdn.discordapp.com/attachments/1279212787372916817/1279265162595012774/Z.png?ex=66d3d006&is=66d27e86&hm=96823b7fdc8205f48a5fe9bfa052f309d2832b38429dab9305e431aed52f95b6&',
  baseStats: {
    lifeDice: '1d8',
    proficiencies: ['Light Armor', 'Medium Armor', 'shields', 'Simple Weapons'],
    modify: 'Charisma',
    expertise: ['Historic', 'Religion', 'Insight', 'Medicine', 'Persuasion'],
    expertiseChoices: 2,
    savingThrows: ['Wisdown', 'Charisma'],
    armor: 'Light Armor',
  },
  levels: [
    {
      level: 1,
      features: ['Spellcasting', 'Divine Domain'],
      spellSlots: { 1: 2 },
    },
    {
      level: 2,
      features: ['Channel Divinity', 'Divine Domain Feature'],
      spellSlots: { 1: 3 },
    },
    {
      level: 3,
      features: ['\u200b'],
      spellSlots: { 1: 4, 2: 2 },
    },
    {
      level: 4,
      features: ['Ability Score Improvement'],
      spellSlots: { 1: 4, 2: 3 },
    },
    {
      level: 5,
      features: ['Destroy Undead (CR 1/2)'],
      spellSlots: { 1: 4, 2: 3, 3: 2 },
    },
    {
      level: 6,
      features: ['Channel Divinity (2/rest)', 'Divine Domain Feature'],
      spellSlots: { 1: 4, 2: 3, 3: 3 },
    },
    {
      level: 7,
      features: ['\u200b'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 1 },
    },
    {
      level: 8,
      features: [
        'Ability Score Improvement',
        'Destroy Undead (CR 1)',
        'Divine Domain Feature',
      ],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 2 },
    },
    {
      level: 9,
      features: ['\u200b'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
    },
    {
      level: 10,
      features: ['Divine Intervention'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
    },
    {
      level: 11,
      features: ['Destroy Undead (CR 2)'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
    },
    {
      level: 12,
      features: ['Ability Score Improvement'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1 },
    },
    {
      level: 13,
      features: ['\u200b'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
    },
    {
      level: 14,
      features: ['Destroy Undead (CR 3)'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1 },
    },
    {
      level: 15,
      features: ['\u200b'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
    },
    {
      level: 16,
      features: ['Ability Score Improvement'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1 },
    },
    {
      level: 17,
      features: ['Destroy Undead (CR 4)', 'Divine Domain Feature'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 1 },
    },
    {
      level: 18,
      features: ['Channel Divinity (3/rest)'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 1, 7: 1, 8: 1, 9: 1 },
    },
    {
      level: 19,
      features: ['Ability Score Improvement'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 1, 8: 1, 9: 1 },
    },
    {
      level: 20,
      features: ['Divine Intervention Improvement'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 2, 8: 1, 9: 1 },
    },
  ],
}
