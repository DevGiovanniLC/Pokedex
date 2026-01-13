import Constants from "../Constants";
import type { Pokemon } from "../models/Pokemon";

export default class PokemonService {
    private static readonly cachedPokemons: Map<number, Pokemon> = new Map();
    private static readonly cachedImages: Set<string> = new Set();

    static async findPokemonList(page: number, pageSize: number): Promise<Pokemon[]> {
        this.clearCache();
        const promises = await this.fetchPokemonList(page, pageSize);
        return promises
            .filter(result => result.status === 'fulfilled')
            .map(result => (result as PromiseFulfilledResult<Pokemon>).value);
    }

    static async findPokemon(id: number): Promise<Pokemon> {
        if (this.cachedPokemons.has(id)) return this.cachedPokemons.get(id)!;
        const data = await this.fetchPokemon(id);
        this.cachePokemon(id, data);
        return data;
    }

    private static async fetchPokemonList(page: number, pageSize: number): Promise<PromiseSettledResult<Pokemon>[]> {
        const startId = (page - 1) * pageSize + 1;
        const endId = page * pageSize;

        const promises = [];
        for (let i = startId; i <= endId; i++) {
            if (i >= Constants.MAX_POKEMON_ID) break;
            promises.push(this.findPokemon(i));
        }
        return Promise.allSettled(promises);
    }

    private static async fetchPokemon(id: number): Promise<Pokemon> {
        const response = await fetch(
            `${Constants.API}/pokemon/${id}`,
        );
        const data: Pokemon = await response.json();
        return data;
    }

    private static cachePokemon(id: number, data: Pokemon): void {
        this.cachedPokemons.set(id, data);

        //Comprobación para el funcionamiento en entornos sin DOM #TESTS
        if (typeof window !== 'undefined' && typeof Image !== 'undefined') {
            const image = new Image()
            this.cachedImages.add(
                image.src = data.sprites.other?.["official-artwork"]?.front_default || ""
            );
        }
    }

    private static clearCache(): void {
        this.cachedPokemons.clear();
        this.cachedImages.clear();
    }
}