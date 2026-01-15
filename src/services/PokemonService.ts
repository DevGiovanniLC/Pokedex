import Constants from "../Constants";
import type { Pokemon, PokemonPreview } from "../models/Pokemon";

export default class PokemonService {
    private static readonly PokemonPreviewCache: PokemonPreview[] = [];
    private static lastOrder: string = '';

    static async getPokemonListPreviewFilterBy(pokemonName: string, pokemonType: string, order: string): Promise<PokemonPreview[]> {
        const pokemons = await this.getPokemonListPreview(order);
        const filteredByName = await this.getPokemonListPreviewFilterByName(pokemons, pokemonName);
        const filteredByType = await this.getPokemonListPreviewFilterByType(filteredByName, pokemonType);

        return filteredByType;
    }

    private static async getPokemonListPreviewFilterByName(pokemons: PokemonPreview[], pokemonName: string): Promise<PokemonPreview[]> {
        if (!pokemonName || pokemonName.trim() === '') return pokemons;
        const id = Number(pokemonName);

        if (!isNaN(id)) return pokemons
            .filter(pokemon => String(pokemon.id).startsWith(pokemonName));

        return pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(pokemonName.toLowerCase()));

    }


    private static async getPokemonListPreviewFilterByType(pokemons: PokemonPreview[], pokemonType: string): Promise<PokemonPreview[]> {
        if (!pokemonType || pokemonType.trim() === '') return pokemons;
        return pokemons.filter(pokemon => (
            pokemon.type_primary.includes(pokemonType) ||
            pokemon.type_secondary?.includes(pokemonType)
        ));
    }

    private static async getPokemonListPreview(order: string): Promise<PokemonPreview[]> {
        if (this.PokemonPreviewCache.length > 0 && this.lastOrder === order) {
            return this.PokemonPreviewCache;
        }

        this.lastOrder = order;
        return this.fetchPokemonListPreview(order);
    }

    static async findPokemon(id: number): Promise<Pokemon> {
        const data = await this.fetchPokemon(id);
        return data;
    }

    static async fetchPokemonListPreview(order: string): Promise<PokemonPreview[]> {
        const response = await fetch(
            `${Constants.API}/pokemonlist?order=${order}`,
        );

        console.log(order);
        const data: PokemonPreview[] = await response.json();
        this.PokemonPreviewCache.length = 0;
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