import { Route, Routes } from 'react-router'
import Pokedex from './pages/Pokedex'
import HomePage from './pages/HomePage'
import DetailedPokemon from './pages/DetailedPokemon'

export default function App() {
    return (
        <Routes>
            <Route path="/*" element={<><HomePage /></>} />
            <Route path="/" element={<><HomePage /></>} />
            <Route path="/pokedex" element={<><Pokedex /></>} />
            <Route path="/pokedex/:pokemonId" element={<><DetailedPokemon /></>} />
        </Routes>
    )
}
