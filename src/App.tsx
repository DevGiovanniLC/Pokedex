
import './App.css'
import { useState } from 'react';
import PokemonList from './Pokemon/PokemonList'
import PokemonRange from './menu/PokemonRange';
import PokemonPage from './menu/PokemonPage';


function App() {
    const [pageSize, setPageSize] = useState(151);
    const [page, setPage] = useState(1);
    
    return (
        <>
            <h1>Pokemon List</h1>
            
            <PokemonRange pageSize={pageSize} setPageSize={setPageSize} />
            <PokemonPage page={page} setPage={setPage} />
            <PokemonList page={page} pageSize={pageSize} />
        </>
    )
}

export default App
