import { useState } from 'react';
import PokemonList from '../components/pokemon/PokemonList'
import PokemonRange from '../components/menu/PokemonRange';
import PokemonPage from '../components/menu/PokemonPage';
import Constants from '../Constants';
import './Pokedex.css';

export default function Pokedex() {
    const [pageSize, setPageSize] = useState(Constants.DEFAULT_POKEMON_PER_PAGE);
    const [page, setPage] = useState(Constants.DEFAULT_POKEMON_PAGE);

    return (
        <>
            <header>
                <img src="/favicon.svg" alt="Pokeball icon" className="pokeball-icon" />
                <h1 className='app-title'>PokeDex</h1>
            </header>
            <menu>
                <PokemonRange pageSize={pageSize} setPageSize={setPageSize} />
                <PokemonPage page={page} setPage={setPage} />
            </menu>
            <PokemonList page={page} pageSize={pageSize} />
        </>
    )
}