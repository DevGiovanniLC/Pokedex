import { Route, Routes } from 'react-router'
import './App.css'
import Pokedex from './pages/Pokedex'
import HomePage from './pages/HomePage'




function App() {
    return (
        <Routes>
            <Route path="/" element={<><HomePage /></>} />
            <Route path="/pokedex" element={<><Pokedex /></>} />
        </Routes>

    )
}

export default App
