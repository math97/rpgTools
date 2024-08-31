interface CharacterClass  {
    className: string;
    image: string;
    baseStats: {
        lifeDice: string;
        proficiencies: string[];
        modify: string;
        expertise: string[];
        expertiseChoices: number;
        savingThrows: string[];
        armor?: string;
    };
    levels: {
        level: number;
        features: string[];
    }[];
}

interface monkClass extends CharacterClass {
    levels: {
        level: number;
        features: string[];
        martialArtsDice: string;
        chiPoints: number;
    }[];
}

interface bardClass extends CharacterClass {
    levels: {
        level: number;
        features: string[];
        spellSlots: {
            [key: number]: number;
        };
    }[];
}