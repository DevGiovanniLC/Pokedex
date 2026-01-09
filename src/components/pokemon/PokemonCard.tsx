import React from "react";
import './PokemonCard.css';
import type { Pokemon } from "../../models/Pokemon";

export interface PokemonCardProps {
    pokemon: Pokemon;
    onClick?: () => void;
}

export class PokemonCard extends React.Component<PokemonCardProps> {
    private pokemon: Pokemon
    
    constructor(props: PokemonCardProps) {
        super(props);
        this.pokemon = props.pokemon;
    }

    render() {
        return (
            <>
            <div className="pokemon-card" onClick={this.props.onClick}>
                <h2><span>#{this.pokemon.id}</span> {this.pokemon.name}</h2>
                <img src={this.pokemon.spriteUrl} alt={this.pokemon.name} />
            </div>
            </>
        )
    }
}