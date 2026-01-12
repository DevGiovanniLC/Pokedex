import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import { lazy, Suspense } from 'react';
const Pokedex = lazy(() => import('./pages/Pokedex'));
const DetailedPokemon = lazy(() => import('./pages/DetailedPokemon'));

export default function App() {
    return (
        <Suspense>
            <Routes>
                <Route path="/*" element={<><HomePage /></>} />
                <Route path="/" element={<><HomePage /></>} />
                <Route path="/pokedex" element={<><Pokedex /></>} />
                <Route path="/pokedex/:pokemonId" element={<><DetailedPokemon /></>} />
            </Routes>
        </Suspense>
    )
}
