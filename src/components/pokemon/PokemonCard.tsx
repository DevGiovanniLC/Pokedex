import './PokemonCard.css';
import type { Pokemon } from "../../models/Pokemon";
import React from 'react';

interface PokemonCardProps {
    pokemon: Pokemon;
    onClick?: () => void;
}

function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
    return (
        <div className={`pokemon-card type-${pokemon.types[0]?.type.name || 'normal'}`} onClick={onClick}>
            <h2><span>#{pokemon.id}</span> {pokemon.name}</h2>
            <img src={pokemon.sprites.front_default ?? ''} alt={pokemon.name} />
        </div>
    );
}

export default React.memo(PokemonCard);