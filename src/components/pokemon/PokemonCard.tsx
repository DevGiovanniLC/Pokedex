import './PokemonCard.css';
import type { Pokemon } from "../../models/Pokemon";

export interface PokemonCardProps {
    pokemon: Pokemon;
    onClick?: () => void;
}

export function PokemonCard({ pokemon, onClick }: PokemonCardProps) {
    return (
        <div className="pokemon-card" onClick={onClick}>
            <h2><span>#{pokemon.id}</span> {pokemon.name}</h2>
            <img src={pokemon.spriteUrl} alt={pokemon.name} />
        </div>
    );
}