import { useState, useEffect, useRef } from "react";
import './PokemonList.css';
import PokemonCard from "./PokemonCard";
import PokemonDetails, { type PokemonDetailsHandle } from "./PokemonDetails";
import type { Pokemon } from "../../models/Pokemon";
import PokemonService from "../../services/PokemonService";

interface PokemonListProps {
    page: number;
    pageSize: number;
}

export default function PokemonList({ page, pageSize }: PokemonListProps) {
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
    const detailsRef = useRef<PokemonDetailsHandle>(null);

    useEffect(() => {
        PokemonService.loadPokemons(page, pageSize).then(pokemons => {
            setPokemonList(pokemons);
        });
    }, [page, pageSize]);

    const onClickPokemon = (pokemon: Pokemon) => {
        detailsRef.current?.openDialog(pokemon);
    };

    if (pokemonList.length === 0) return (
        <div className="pokemon-list-container">
            <p>No hay Pokemons disponibles.</p>
            <p>Vuelva en otro momento.</p>
        </div>
    )

    return (
        <div className="pokemon-list-container">
            <ul className="pokemon-list">
                {pokemonList.map((pokemon) => (
                    <li key={pokemon.id}>
                        <PokemonCard
                            pokemon={pokemon}
                            onClick={() => onClickPokemon(pokemon)}
                        />
                    </li>
                ))}
            </ul>
            <PokemonDetails ref={detailsRef} />
        </div>
    );
}