
import React from "react";
import './PokemonList.css';
import { PokemonCard } from "./PokemonCard";
import Pokemon from "./models/Pokemon";

interface PokemonListState {
    pokemonNames: Pokemon[];
}

export default class PokemonList extends React.Component<{ page: number, pageSize: number }, PokemonListState> {

    constructor(props: { page: number, pageSize: number }) {
        super(props);

        this.state = {
            pokemonNames: []
        };
    }

    render() {
        return (
            <>
            <div className="pokemon-list-container">
                <ul className="pokemon-list">
                    {this.state.pokemonNames.map((pokemon) => (
                        <li><PokemonCard key={pokemon.id} pokemon={pokemon} /></li>
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
            const currentIds = new Set(this.state.pokemonNames.map(p => p.id));
            const neededIds = new Set();


            for (let i = (this.props.page - 1) * this.props.pageSize + 1; i <= this.props.page * this.props.pageSize; i++) {
                neededIds.add(i);
            }


            const filteredPokemons = this.state.pokemonNames.filter(p => neededIds.has(p.id));
            this.setState({ pokemonNames: filteredPokemons });


            for (let i = (this.props.page - 1) * this.props.pageSize + 1; i <= this.props.page * this.props.pageSize; i++) {
                if (!currentIds.has(i)) {
                    this.getPokemon(i).then(pokemon => {
                        this.setState(prevState => ({
                            pokemonNames: [...prevState.pokemonNames, pokemon].sort((a, b) => a.id - b.id)
                        }));
                    });
                }
            }
        }
    }

    private loadPokemons() {
        for (let i = this.props.page; i < this.props.page + this.props.pageSize; i++) {
            this.getPokemon(i).then(name => {
                this.setState(prevState => ({
                    pokemonNames: [...prevState.pokemonNames, name]
                }));
            });
        }
    }

    private async getPokemon(id: number): Promise<Pokemon> {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        return new Pokemon(id, data.name, data.sprites.front_default);
    }
}