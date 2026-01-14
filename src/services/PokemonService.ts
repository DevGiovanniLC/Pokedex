import Constants from "../Constants";
import type { Pokemon, PokemonPreview } from "../models/Pokemon";

export default class PokemonService {
    private static readonly PokemonPreviewCache: PokemonPreview[] = [];

    static async getPokemonListPreviewFilterBy(pokemonName: string): Promise<PokemonPreview[]> {
        const pokemons = await this.getPokemonListPreview();
        if (!pokemonName || pokemonName.trim() === '') return pokemons;
        return pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(pokemonName.toLowerCase()));
    }

    private static async getPokemonListPreview(): Promise<PokemonPreview[]> {
        if (this.PokemonPreviewCache.length > 0) {
            return this.PokemonPreviewCache;
        }
        return this.fetchPokemonListPreview();
    }

    static async findPokemon(id: number): Promise<Pokemon> {
        const data = await this.fetchPokemon(id);
        return data;
    }

    static async fetchPokemonListPreview(): Promise<PokemonPreview[]> {
        const response = await fetch(
            `${Constants.API}/pokemonlist`,
        );

        const data: PokemonPreview[] = await response.json();
        this.PokemonPreviewCache.push(...data);
        return this.PokemonPreviewCache;
    }

    private static async fetchPokemon(id: number): Promise<Pokemon> {
        const response = await fetch(
            `${Constants.API}/pokemon/${id}`,
        );
        const data: Pokemon = await response.json();
        return data;
    }


}