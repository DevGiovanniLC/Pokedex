jest.mock("../Constants", () => ({
    __esModule: true,
    default: {
        API: "https://pokeapi.co/api/v2",
        MAX_POKEMON_ID: 1025,
    },
}));

import PokemonService from "./PokemonService";

describe("PokemonService tests", () => {
    it("fetches a Pokemon by ID", async () => {
        const pokemon = await PokemonService.findPokemon(1);
        expect(pokemon.name).toBe("bulbasaur");
    });

    it("fetches a Pokemon by ID 2", async () => {
        const pokemon = await PokemonService.findPokemon(2);
        expect(pokemon.name).toBe("ivysaur");
    });

    it("loads first page of Pokemons", async () => {
        const pokemons = await PokemonService.findPokemonList(1, 5);
        expect(pokemons.length).toBe(5);
        expect(pokemons[0].name).toBe("bulbasaur");
        expect(pokemons[3].name).toBe("charmander");
    });

    it("loads second page of Pokemons", async () => {
        const pokemons = await PokemonService.findPokemonList(2, 6);
        expect(pokemons.length).toBe(6);
        expect(pokemons[0].name).toBe("squirtle");
        expect(pokemons[2].name).toBe("blastoise");
    });
});