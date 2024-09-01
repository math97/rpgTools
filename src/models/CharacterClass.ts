export interface CharacterClass {
  className: string
  image: string
  baseStats: {
    lifeDice: string
    proficiencies: string[]
    modify: string
    expertise: string[]
    expertiseChoices: number
    savingThrows: string[]
    armor?: string
  }
  levels: {
    level: number
    features: string[]
  }[]
}

export interface monkClass extends CharacterClass {
  levels: {
    level: number
    features: string[]
    martialArtsDice: string
    chiPoints: number
  }[]
}

export interface bardClass extends CharacterClass {
  levels: {
    level: number
    features: string[]
    spellSlots: {
      [key: number]: number
    }
  }[]
}

export interface barbarianClass extends CharacterClass {
  levels: {
    level: number
    features: string[]
    fury?: number
    furyDamage: number
  }[]
}
export interface clericClass extends CharacterClass {
  levels: {
    level: number
    features: string[]
    spellSlots: {
      [key: number]: number
    }
  }[]
}

export interface druidClass extends CharacterClass {
  levels: {
    level: number
    features: string[]
    spellSlots: {
      [key: number]: number
    }
  }[]
}

export type AnyCharacterClass = CharacterClass | monkClass | bardClass
export type magicClass = bardClass | clericClass | druidClass
