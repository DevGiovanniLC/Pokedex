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
            <h1 className='app-title'>Pokemon List</h1>
            <menu>
                <PokemonRange pageSize={pageSize} setPageSize={setPageSize} />
                <PokemonPage page={page} setPage={setPage} />
            </menu>
            <PokemonList page={page} pageSize={pageSize} />
        </>
    )
}

export default App
