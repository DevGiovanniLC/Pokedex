import Constants from "../Constants";
import type { Pokemon } from "../models/Pokemon";

export default class PokemonService {

    static async loadPokemons(page: number, pageSize: number): Promise<Pokemon[]> {
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
        const response = await fetch(`${Constants.API}/pokemon/${id}`);
        const data: Pokemon = await response.json();
        return data;
    }
}