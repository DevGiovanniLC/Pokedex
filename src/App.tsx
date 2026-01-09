import { useState } from 'react';
import './App.css'

import PokemonList from './components/pokemon/PokemonList'
import PokemonRange from './components/menu/PokemonRange';
import PokemonPage from './components/menu/PokemonPage';


function App() {
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    
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

export default App
