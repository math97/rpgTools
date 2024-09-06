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

export type defaultRacesType = keyof typeof DefaultRaces
