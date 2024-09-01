import { magicClass } from '@/models/CharacterClass'

export const druid: magicClass = {
  className: 'Druid',
  image:
    'https://cdn.discordapp.com/attachments/1279212787372916817/1279239529626337352/27812518-2e6a-45e2-920a-5481cf61ec8e.png?ex=66d3b826&is=66d266a6&hm=2e99960ce6e98a236934724f3c376e1e476613ae4d03cda4a786adf3133bc38d&',
  baseStats: {
    lifeDice: '1d8',
    proficiencies: [
      'Light Armor',
      'medium Armor',
      'shields',
      'clubs',
      'daggers',
      'darts',
      'javelins',
      'maces',
      'quarterstaffs',
      'scimitars',
      'sickles',
      'slings',
      'spears',
    ],
    modify: 'Charisma',
    expertise: [
      'Arcana',
      'Animal Handling',
      'Insight',
      'Medicine',
      'Nature',
      'Perception',
      'Religion',
      'Survival',
    ],
    expertiseChoices: 2,
    savingThrows: ['Intelligence', 'Wisdom'],
    armor: 'Light Armor',
  },
  levels: [
    {
      level: 1,
      features: ['Spellcasting', 'Druidic'],
      spellSlots: { 1: 2 },
    },
    {
      level: 2,
      features: ['Druid Circle', 'Wild Shape'],
      spellSlots: { 1: 3 },
    },
    {
      level: 3,
      features: ['\u200b'],
      spellSlots: { 1: 4, 2: 2 },
    },
    {
      level: 4,
      features: ['Ability Score Improvement', 'Wild Shape Improvement'],
      spellSlots: { 1: 4, 2: 3 },
    },
    {
      level: 5,
      features: ['\u200b'],
      spellSlots: { 1: 4, 2: 3, 3: 2 },
    },
    {
      level: 6,
      features: ['Druid Circle Feature'],
      spellSlots: { 1: 4, 2: 3, 3: 3 },
    },
    { level: 7, features: ['\u200b'], spellSlots: { 1: 4, 2: 3, 3: 3, 4: 1 } },
    {
      level: 8,
      features: ['Ability Score Improvement', 'Wild Shape Improvement'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 2 },
    },
    {
      level: 9,
      features: ['\u200b'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 1 },
    },
    {
      level: 10,
      features: ['Druid Circle Feature'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2 },
    },
    {
      level: 11,
      features: ['\u200b'],
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
      features: ['Druid Circle Feature'],
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
      features: ['\u200b'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 2, 6: 1, 7: 1, 8: 1, 9: 1 },
    },
    {
      level: 18,
      features: ['Timeless Body', 'Beast Spells'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 1, 7: 1, 8: 1, 9: 1 },
    },
    {
      level: 19,
      features: ['Ability Score Improvement'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 1, 8: 1, 9: 1 },
    },
    {
      level: 20,
      features: ['Superior Inspiration'],
      spellSlots: { 1: 4, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 2, 8: 1, 9: 1 },
    },
  ],
}
