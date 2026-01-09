import { useState, useEffect, useRef } from "react";
import './PokemonList.css';
import { PokemonCard } from "./PokemonCard";
import PokemonDetails, { type PokemonDetailsHandle } from "./PokemonDetails";
import { Pokemon } from "../../models/Pokemon";
import PokemonService from "../../services/PokemonService";

interface PokemonListProps {
    page: number;
    pageSize: number;
}

export default function PokemonList({ page, pageSize }: PokemonListProps) {
    const [pokemonNames, setPokemonNames] = useState<Pokemon[]>([]);
    const detailsRef = useRef<PokemonDetailsHandle>(null);

    useEffect(() => {
        PokemonService.loadPokemons(page, pageSize).then(pokemons => {
            setPokemonNames(pokemons);
        });
    }, [page, pageSize]);

    const onClickPokemon = (pokemon: Pokemon) => {
        detailsRef.current?.openDialog(pokemon);
    };

    return (
        <>
            <PokemonDetails ref={detailsRef} pokemon={null} />
            <div className="pokemon-list-container">
                <ul className="pokemon-list">
                    {pokemonNames.map((pokemon) => (
                        <li key={pokemon.id}>
                            <PokemonCard
                                pokemon={pokemon}
                                onClick={() => onClickPokemon(pokemon)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}