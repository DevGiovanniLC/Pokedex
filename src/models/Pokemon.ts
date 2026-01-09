export class Pokemon {
    readonly id: number;
    readonly name: string;
    readonly spriteUrl: string;
    readonly officialArtwork: string;
    readonly height: number;
    readonly weight: number;
    readonly types: string[];
    readonly stats: { name: string; value: number }[];
    readonly abilities: string[];
    readonly baseExperience: number;

    constructor(
        id: number,
        name: string,
        spriteUrl: string,
        officialArtwork: string,
        height: number,
        weight: number,
        types: string[],
        stats: { name: string; value: number }[],
        abilities: string[],
        baseExperience: number
    ) {
        this.id = id;
        this.name = name;
        this.spriteUrl = spriteUrl;
        this.officialArtwork = officialArtwork;
        this.height = height;
        this.weight = weight;
        this.types = types;
        this.stats = stats;
        this.abilities = abilities;
        this.baseExperience = baseExperience;
    }
}

export interface PokemonType {
    type: {
        name: string;
    };
}

export interface PokemonStat {
    stat: {
        name: string;
    };
    base_stat: number;
}

export interface PokemonAbility {
    ability: {
        name: string;
    };
    is_hidden: boolean;
}