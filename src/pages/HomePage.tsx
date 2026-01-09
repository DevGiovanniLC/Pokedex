import { useNavigate } from 'react-router';
import './HomePage.css';

export default function HomePage() {
    const navigate = useNavigate();

    const handleGoToPokedex = () => {
        navigate('/pokedex');
    };

    return (
        <div className="home-container">
            <div className="hero-section">
                <div className="pokeball-bg"></div>
                <h1 className="title">
                    Bienvenido a <span className="highlight">PokéDex</span>
                </h1>
                <p className="subtitle">
                    Explora el mundo Pokémon como nunca antes
                </p>
            </div>

            <div className="features-section">
                <div className="feature-card">
                    <div className="feature-icon">🔍</div>
                    <h3>Explorar Pokémon</h3>
                    <p>Descubre más de 1000 Pokémon con información detallada sobre cada uno</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">📊</div>
                    <h3>Estadísticas</h3>
                    <p>Consulta HP, ataque, defensa y todas las características de cada Pokémon</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">🎨</div>
                    <h3>Imágenes HD</h3>
                    <p>Visualiza sprites oficiales y artwork de alta calidad</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">⚡</div>
                    <h3>Tipos y Habilidades</h3>
                    <p>Aprende sobre tipos, evoluciones y habilidades especiales</p>
                </div>
            </div>

            <button className="cta-button" onClick={handleGoToPokedex}>
                <span>Comenzar Aventura</span>
                <span className="arrow">→</span>
            </button>

            <footer className="home-footer">
                <p>Powered by PokéAPI • Creado con React + TypeScript</p>
            </footer>
        </div>
    );
}
