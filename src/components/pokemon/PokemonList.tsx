
import React, { type Ref } from "react";
import './PokemonList.css';
import { PokemonCard } from "./PokemonCard";
import PokemonDetails from "./PokemonDetails";
import { Pokemon } from "../../models/Pokemon";
import PokemonService from "../../services/PokemonService";

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
        PokemonService.loadPokemons(this.props.page, this.props.pageSize).then(pokemons => {
            this.setState({ pokemonNames: pokemons });
        });
    }

    componentDidUpdate(prevProps: { page: number, pageSize: number }) {
        const isUpdated = prevProps.page !== this.props.page || prevProps.pageSize !== this.props.pageSize;

        if (isUpdated) {
            PokemonService.loadPokemons(this.props.page, this.props.pageSize).then(pokemons => {
                this.setState({ pokemonNames: pokemons });
            });
        }
    }

    onClickPokemon(pokemon: Pokemon) {
        (this.detailsRef as React.RefObject<PokemonDetails>).current?.openDialog(pokemon);
    }
}