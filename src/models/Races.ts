export enum DefaultRaces {
  DWARF = 'dwarf',
  ELF = 'elf',
  HALFLING = 'halfling',
  HUMAN = 'human',
  DRAGONBORN = 'dragonborn',
  GNOME = 'gnome',
  'HALF-ELF' = 'half-elf',
  'HALF-ORC' = 'half-orc',
  TIEFLING = 'tiefling',
}

export const racesOption = [
  { name: 'Human', value: 'Human' },
  { name: 'Elf', value: 'Elf' },
  { name: 'Dwarf', value: 'Dwarf' },
  { name: 'Halfling', value: 'Halfling' },
  { name: 'Dragonborn', value: 'Dragonborn' },
  { name: 'Gnome', value: 'Gnome' },
  { name: 'Half-Elf', value: 'Half-Elf' },
  { name: 'Half-Orc', value: 'Half-Orc' },
  { name: 'Tiefling', value: 'Tiefling' },
]

export type defaultRacesType = keyof typeof DefaultRaces
