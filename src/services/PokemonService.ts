import Constants from "../Constants";
import type { Pokemon } from "../models/Pokemon";

export default class PokemonService {
    static cachedPokemons: Map<number, Pokemon> = new Map();

    static async loadPokemons(page: number, pageSize: number): Promise<Pokemon[]> {
        this.cachedPokemons.clear();
        const startId = (page - 1) * pageSize + 1;
        const endId = page * pageSize;

        const promises = [];

        for (let i = startId; i <= endId; i++) {
            console.log(`Loading Pokemon ID: ${Constants.MAX_POKEMON_ID}`);
            if (i >= Constants.MAX_POKEMON_ID) break;
            promises.push(this.getPokemon(i));
        }

        const results = await Promise.allSettled(promises);
        return results
            .filter(result => result.status === 'fulfilled')
            .map(result => (result as PromiseFulfilledResult<Pokemon>).value);
    }

    static async getPokemon(id: number): Promise<Pokemon> {
        if (this.cachedPokemons.has(id)) return this.cachedPokemons.get(id)!;

        const response = await fetch(`${Constants.API}/pokemon/${id}`);
        const data: Pokemon = await response.json();
        this.cachedPokemons.set(id, data);
        return data;
    }
}