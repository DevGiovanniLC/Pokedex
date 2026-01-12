// Interfaces auxiliares para recursos con nombre y URL
export interface NamedAPIResource {
    name: string;
    url: string;
}

// Habilidades
export interface PokemonAbility {
    ability: NamedAPIResource;
    is_hidden: boolean;
    slot: number;
}

// Sonidos/Cries
export interface PokemonCries {
    latest: string;
    legacy: string;
}

// Formas
export interface PokemonForm {
    name: string;
    url: string;
}

// Índices de juego
export interface PokemonGameIndex {
    game_index: number;
    version: NamedAPIResource;
}

// Items sostenidos
export interface PokemonHeldItemVersion {
    rarity: number;
    version: NamedAPIResource;
}

export interface PokemonHeldItem {
    item: NamedAPIResource;
    version_details: PokemonHeldItemVersion[];
}

// Movimientos
export interface PokemonMoveVersion {
    level_learned_at: number;
    move_learn_method: NamedAPIResource;
    order: number | null;
    version_group: NamedAPIResource;
}

export interface PokemonMove {
    move: NamedAPIResource;
    version_group_details: PokemonMoveVersion[];
}

// Habilidades pasadas
export interface PokemonPastAbility {
    abilities: (PokemonAbility | null)[];
    generation: NamedAPIResource;
}

// Tipos pasados
export interface PokemonPastType {
    generation: NamedAPIResource;
    types: PokemonType[];
}

// Sprites
export interface PokemonSprites {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other?: PokemonSpritesOther;
    versions?: PokemonSpritesVersions;
}

export interface PokemonSpritesOther {
    dream_world?: {
        front_default: string | null;
        front_female: string | null;
    };
    home?: {
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
    };
    "official-artwork"?: {
        front_default: string | null;
        front_shiny: string | null;
    };
    showdown?: {
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
    };
}

export interface PokemonSpritesVersions {
    "generation-i"?: Record<string, Record<string, string | null>>;
    "generation-ii"?: Record<string, Record<string, string | null>>;
    "generation-iii"?: Record<string, Record<string, string | null>>;
    "generation-iv"?: Record<string, Record<string, string | null>>;
    "generation-v"?: Record<string, Record<string, string | null>>;
    "generation-vi"?: Record<string, Record<string, string | null>>;
    "generation-vii"?: Record<string, Record<string, string | null>>;
    "generation-viii"?: Record<string, Record<string, string | null>>;
    "generation-ix"?: Record<string, Record<string, string | null>>;
}

// Stats
export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: NamedAPIResource;
}

// Tipos
export interface PokemonType {
    slot: number;
    type: NamedAPIResource;
}

// Especie
export interface PokemonSpecies {
    name: string;
    url: string;
}

// Interfaz principal de Pokemon (respuesta completa de la API)
export interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    order: number;
    is_default: boolean;
    location_area_encounters: string;
    abilities: PokemonAbility[];
    cries: PokemonCries;
    forms: PokemonForm[];
    game_indices: PokemonGameIndex[];
    held_items: PokemonHeldItem[];
    moves: PokemonMove[];
    past_abilities: PokemonPastAbility[];
    past_types: PokemonPastType[];
    species: PokemonSpecies;
    sprites: PokemonSprites;
    stats: PokemonStat[];
    types: PokemonType[];
}