import './PokemonCard.css';
import type { PokemonPreview } from "../../models/Pokemon";
import React from 'react';

interface PokemonCardProps {
    pokemon: PokemonPreview;
    onClick?: () => void;
}

function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
    return (
        <div className={`pokemon-card type-${pokemon.type_primary || 'normal'}`} onClick={onClick}>
            <h2><span>#{pokemon.id}</span> {pokemon.name}</h2>
            <img src={pokemon.sprite_front} alt={pokemon.name} />
        </div>
    );
}

export default React.memo(PokemonCard);