import { Race } from './races.interface'

const races: Race[] = [
  {
    name: 'Human',
    abilityScore: 'Your ability scores each increase by 1.',
    traits: ['Size: Medium', 'Speed: 9 meters'],
    languages: ['Common', 'one extra language of your choice'],
    proficiencies: 2,
  },
  {
    name: 'Elf',
    abilityScore: 'Your Dexterity score increases by 2.',
    traits: [
      'Size: Medium',
      'Speed: 9 meters',
      'Darkvision: You can see in dim light within 18.2 meters of you as if it were bright light, and in darkness as if it were dim light.',
      'Fey Ancestry: You have advantage on saving throws against being charmed, and magic can’t put you to sleep.',
      'Trance: Elves don’t need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day.',
    ],
    languages: ['Common', 'Elvish'],
    proficiencies: 2,
  },
  {
    name: 'Dwarf',
    abilityScore: 'Your Constitution score increases by 2.',
    traits: [
      'Size: Medium',
      'Speed: 7.5 meters',
      'Darkvision: You can see in dim light within 18.2 meters of you as if it were bright light, and in darkness as if it were dim light.',
      'Dwarven Resilience: You have advantage on saving throws against poison, and you have resistance against poison damage.',
      'Stonecunning: Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check, instead of your normal proficiency bonus.',
    ],
    languages: ['Common', 'Dwarvish'],
    proficiencies: 2,
  },
  {
    name: 'Halfling',
    abilityScore: 'Your Dexterity score increases by 2.',
    traits: [
      'Size: Small',
      'Speed: 7.5 meters',
      'Lucky: When you roll a 1 on an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.',
      'Brave: You have advantage on saving throws against being frightened.',
      'Halfling Nimbleness: You can move through the space of any creature that is of a size larger than yours.',
    ],
    languages: ['Common', 'Halfling'],
    proficiencies: 2,
  },
  {
    name: 'Dragonborn',
    abilityScore:
      'Your Strength score increases by 2, and your Charisma score increases by 1.',
    traits: [
      'Size: Medium',
      'Speed: 9 meters',
      'Draconic Ancestry: You have draconic ancestry. Choose one type of dragon from the Draconic Ancestry table. Your breath weapon and damage resistance are determined by the dragon type.',
      'Breath Weapon: You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type of the exhalation.',
      'Damage Resistance: You have resistance to the damage type associated with your draconic ancestry.',
    ],
    languages: ['Common', 'Draconic'],
    proficiencies: 2,
  },
  {
    name: 'Gnome',
    abilityScore: 'Your Intelligence score increases by 2.',
    traits: [
      'Size: Small',
      'Speed: 7.5 meters',
      'Darkvision: You can see in dim light within 18.2 meters of you as if it were bright light, and in darkness as if it were dim light.',
      'Gnome Cunning: You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.',
    ],
    languages: ['Common', 'Gnomish'],
    proficiencies: 2,
  },
  {
    name: 'Half-Elf',
    abilityScore:
      'Your Charisma score increases by 2, and two other ability scores of your choice increase by 1.',
    traits: [
      'Size: Medium',
      'Speed: 9 meters',
      'Darkvision: You can see in dim light within 18.2 meters of you as if it were bright light, and in darkness as if it were dim light.',
      'Fey Ancestry: You have advantage on saving throws against being charmed, and magic can’t put you to sleep.',
      'Skill Versatility: You gain proficiency in two skills of your choice.',
    ],
    languages: ['Common', 'Elvish'],
    proficiencies: 2,
  },
  {
    name: 'Half-Orc',
    abilityScore:
      'Your Strength score increases by 2, and your Constitution score increases by 1.',
    traits: [
      'Size: Medium',
      'Speed: 9 meters',
      'Darkvision: You can see in dim light within 18.2 meters of you as if it were bright light, and in darkness as if it were dim light.',
      'Menacing: You gain proficiency in the Intimidation skill.',
      'Relentless Endurance: When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead.',
    ],
    languages: ['Common', 'Orc'],
    proficiencies: 2,
  },
  {
    name: 'Tiefling',
    abilityScore:
      'Your Intelligence score increases by 1, and your Charisma score increases by 2.',
    traits: [
      'Size: Medium',
      'Speed: 9 meters',
      'Darkvision: You can see in dim light within 18.2 meters of you as if it were bright light, and in darkness as if it were dim light.',
      'Hellish Resistance: You have resistance to fire damage.',
      'Infernal Legacy: You know the Thaumaturgy cantrip. When you reach 3rd level, you can cast the Hellish Rebuke spell as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest. When you reach 5th level, you can cast the Darkness spell once with this trait and regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells.',
    ],
    languages: ['Common', 'Infernal'],
    proficiencies: 2,
  },
]

const racesOption = [
  { name: 'Human', value: 'human' },
  { name: 'Elf', value: 'elf' },
  { name: 'Dwarf', value: 'dwarf' },
  { name: 'Halfling', value: 'halfling' },
  { name: 'Dragonborn', value: 'dragonborn' },
  { name: 'Gnome', value: 'gnome' },
  { name: 'Half-Elf', value: 'half_elf' },
  { name: 'Half-Orc', value: 'half_orc' },
  { name: 'Tiefling', value: 'tiefling' },
]

export default {
  races,
  racesOption,
}
