
import React, { type Ref } from "react";
import './PokemonList.css';
import { PokemonCard } from "./PokemonCard";
import PokemonDetails from "./PokemonDetails";
import { Pokemon, type PokemonAbility, type PokemonStat, type PokemonType } from "../../models/Pokemon";

interface PokemonListState {
    pokemonNames: Pokemon[];
}

export default class PokemonList extends React.Component<{ page: number, pageSize: number }, PokemonListState> {
    detailsRef: Ref<PokemonDetails>;

    constructor(props: { page: number, pageSize: number }) {
        super(props);

        this.detailsRef = React.createRef<PokemonDetails>();

        this.state = {
            pokemonNames: []
        };
    }

    render() {
        return (
            <>
                <PokemonDetails ref={this.detailsRef} pokemon={null} />
                <div className="pokemon-list-container">
                    <ul className="pokemon-list">
                        {this.state.pokemonNames.map((pokemon) => (
                            <li key={pokemon.id}><PokemonCard pokemon={pokemon} onClick={() => this.onClickPokemon(pokemon)} /></li>
                        ))}
                    </ul>
                </div>
            </>
        )
    }

    componentDidMount() {
        this.loadPokemons();
    }

    componentDidUpdate(prevProps: { page: number, pageSize: number }) {

        const isUpdated = prevProps.page !== this.props.page || prevProps.pageSize !== this.props.pageSize;

        if (isUpdated) {
            this.loadPokemons();
        }
    }

    private loadPokemons() {
        const startId = (this.props.page - 1) * this.props.pageSize + 1;
        const endId = this.props.page * this.props.pageSize;

        const promises = [];
        for (let i = startId; i <= endId; i++) {
            promises.push(this.getPokemon(i));
        }

        Promise.all(promises).then(pokemons => {
            this.setState({ pokemonNames: pokemons });
        });
    }

    private async getPokemon(id: number): Promise<Pokemon> {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
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

    onClickPokemon(pokemon: Pokemon) {
        (this.detailsRef as React.RefObject<PokemonDetails>).current?.openDialog(pokemon);
    }
}