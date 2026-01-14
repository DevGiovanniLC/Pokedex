import { useState } from 'react';
import PokemonList from '../components/pokemon/PokemonList'
import './Pokedex.css';
import PokemonSearch from '../components/menu/PokemonSearch';

export default function Pokedex() {
    const [pokemonName, setPokemonSearched] = useState<string>('');

    return (
        <>
            <header>
                <img src="/favicon.svg" alt="Pokeball icon" className="pokeball-icon" />
                <h1 className='app-title'>PokeDex</h1>
            </header>
            <menu>
                <PokemonSearch text={pokemonName} setText={setPokemonSearched} />
            </menu>
            <PokemonList pokemonName={pokemonName} />
        </>
    )
}