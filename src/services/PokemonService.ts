import Constants from "../constants";
import { Pokemon, type PokemonAbility, type PokemonStat, type PokemonType } from "../models/Pokemon";

export default class PokemonService {

    static async loadPokemons( page: number, pageSize: number ): Promise<Pokemon[]> {
        const startId = (page - 1) * pageSize + 1;
        const endId = page * pageSize;

        const promises = [];

        for (let i = startId; i <= endId; i++) {
            promises.push(this.getPokemon(i));
        }

        return await Promise.all(promises)
    }

    private static async getPokemon(id: number): Promise<Pokemon> {
        const response = await fetch(`${Constants.API}/pokemon/${id}`);
        const data = await response.json();
        return new Pokemon(
            id,
            data.name,
            data.sprites.front_default,
            data.sprites.other['official-artwork'].front_default,
            data.height,
            data.weight,
            data.types.map((t: PokemonType) => t.type.name),
            data.stats.map((s: PokemonStat) => ({ name: s.stat.name, value: s.base_stat })),
            data.abilities.filter((a: PokemonAbility) => !a.is_hidden).map((a: PokemonAbility) => a.ability.name),
            data.base_experience
        );
    }
}