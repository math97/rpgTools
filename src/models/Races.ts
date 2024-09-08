export enum DefaultRaces {
  DWARF = 'dwarf',
  ELF = 'elf',
  HALFLING = 'halfling',
  HUMAN = 'human',
  DRAGONBORN = 'dragonborn',
  GNOME = 'gnome',
  // HALFELF = 'half-elf',
  // HALFORC = 'half-orc',
  TIEFLING = 'tiefling',
}

export const racesOption = [
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

export type defaultRacesType = keyof typeof DefaultRaces
