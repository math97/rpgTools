import { CharacterClass } from '@/models/CharacterClass'

export const fighter: CharacterClass = {
  className: 'Fighter',
  image:
    'https://cdn.discordapp.com/attachments/1279212787372916817/1279887249852334080/636272697874197438.png?ex=66d61363&is=66d4c1e3&hm=bc4ed57dbfbf60a24a844262dd6d99293907fcc2e69519f7266835110b24e3b2&',
  baseStats: {
    lifeDice: '1d10',
    proficiencies: [
      'All Armor',
      'Shields',
      'Simple Weapons',
      'Martial Weapons',
    ],
    modify: 'Strength or Dexterity',
    expertise: [
      'Acrobatics',
      'Animal Handling',
      'Athletics',
      'History',
      'Insight',
      'Intimidation',
      'Perception',
      'Survival',
    ],
    expertiseChoices: 2,
    savingThrows: ['Strength', 'Constitution'],
    armor: 'All Armor',
  },
  levels: [
    {
      level: 1,
      features: ['Fighting Style', 'Second Wind'],
    },
    {
      level: 2,
      features: ['Action Surge (1 use)'],
    },
    {
      level: 3,
      features: ['Martial Archetype'],
    },
    {
      level: 4,
      features: ['Ability Score Improvement'],
    },
    {
      level: 5,
      features: ['Extra Attack'],
    },
    {
      level: 6,
      features: ['Ability Score Improvement'],
    },
    {
      level: 7,
      features: ['Martial Archetype feature'],
    },
    {
      level: 8,
      features: ['Ability Score Improvement'],
    },
    {
      level: 9,
      features: ['Indomitable (1 use)'],
    },
    {
      level: 10,
      features: ['Martial Archetype feature'],
    },
    {
      level: 11,
      features: ['Extra Attack (2)'],
    },
    {
      level: 12,
      features: ['Ability Score Improvement'],
    },
    {
      level: 13,
      features: ['Indomitable (2 uses)'],
    },
    {
      level: 14,
      features: ['Martial Archetype feature'],
    },
    {
      level: 15,
      features: ['Martial Archetype feature'],
    },
    {
      level: 16,
      features: ['Ability Score Improvement'],
    },
    {
      level: 17,
      features: ['Action Surge (2 uses)', 'Indomitable (3 uses)'],
    },
    {
      level: 18,
      features: ['Martial Archetype feature'],
    },
    {
      level: 19,
      features: ['Ability Score Improvement'],
    },
    {
      level: 20,
      features: ['Extra Attack (3)', 'Indomitable (4 uses)'],
    },
  ],
}
