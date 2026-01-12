import { useParams, useNavigate, Link } from "react-router"
import PokemonService from "../services/PokemonService"
import type { Pokemon } from "../models/Pokemon";
import { useState, useEffect } from "react";
import "./DetailedPokemon.css";


export default function DetailedPokemon() {
    const { pokemonId } = useParams<{ pokemonId: string }>()
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [error, setError] = useState<boolean>(false);


    const isValidId = checkPokemonId(pokemonId)

    useEffect(() => {
        if (!isValidId || !pokemonId) return;

        PokemonService.getPokemon(Number(pokemonId)).then((data) => {
            setPokemon(data);
            setError(false);
        }).catch(() => {
            setError(true);
        });
    }, [pokemonId, isValidId]);

    if (!isValidId || !pokemonId || error) {
        return (
            <div className="error-container">
                <h2>Pokemon no encontrado</h2>
                <p>El ID proporcionado no es válido o el Pokemon no existe.</p>
            </div>
        );
    }

    if (!pokemon) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    const officialArtwork = pokemon.sprites.other?.["official-artwork"]?.front_default;
    const maxStat = 255;
    const primaryType = pokemon.types[0]?.type.name || 'normal';

    const currentId = Number(pokemonId);
    const hasPrevious = currentId > 1;
    const hasNext = currentId < 1025;

    return (
        <div className={`pokemon-detail type-${primaryType}`}>
            <div className="nav-header">
                <button 
                    className="nav-button previous-button" 
                    onClick={() => navigate(`/pokedex/${currentId - 1}`)}
                    disabled={!hasPrevious}
                >
                    ← Anterior
                </button>

                <Link to="/pokedex" className="nav-button back-to-pokedex">
                    Volver al Pokedex
                </Link>
                
                <button 
                    className="nav-button next-button" 
                    onClick={() => navigate(`/pokedex/${currentId + 1}`)}
                    disabled={!hasNext}
                >
                    Siguiente →
                </button>
            </div>
            {/* Header con imagen y datos básicos */}
            <div className="pokemon-header">
                <div className="pokemon-id">#{String(pokemon.id).padStart(4, '0')}</div>
                <h1 className="pokemon-name">{pokemon.name}</h1>
            </div>

            <div className="pokemon-image-container">
                {officialArtwork && (
                    <img 
                        src={officialArtwork} 
                        alt={pokemon.name} 
                        className="pokemon-artwork"
                    />
                )}
                <div className="pokemon-sprites">
                    {pokemon.sprites.front_default && (
                        <img src={pokemon.sprites.front_default} alt="front" />
                    )}
                    {pokemon.sprites.back_default && (
                        <img src={pokemon.sprites.back_default} alt="back" />
                    )}
                    {pokemon.sprites.front_shiny && (
                        <img src={pokemon.sprites.front_shiny} alt="shiny front" />
                    )}
                    {pokemon.sprites.back_shiny && (
                        <img src={pokemon.sprites.back_shiny} alt="shiny back" />
                    )}
                </div>
            </div>
            
            <div className="pokemon-types">
                {pokemon.types.map((t) => (
                    <span key={t.slot} className={`type-badge type-${t.type.name}`}>
                        {t.type.name}
                    </span>
                ))}
            </div>

            <div className="pokemon-measurements">
                <div className="measurement">
                    <span className="measurement-label">Altura</span>
                    <span className="measurement-value">{(pokemon.height / 10).toFixed(1)} m</span>
                </div>
                <div className="measurement">
                    <span className="measurement-label">Peso</span>
                    <span className="measurement-value">{(pokemon.weight / 10).toFixed(1)} kg</span>
                </div>
                <div className="measurement">
                    <span className="measurement-label">Exp. Base</span>
                    <span className="measurement-value">{pokemon.base_experience ?? 'N/A'}</span>
                </div>
                <div className="measurement">
                    <span className="measurement-label">Orden</span>
                    <span className="measurement-value">#{pokemon.order}</span>
                </div>
            </div>

            {/* Stats */}
            <div className="section">
                <h2 className="section-title">📊 Estadísticas Base</h2>
                <div className="stats-grid">
                    {pokemon.stats.map((stat) => (
                        <div key={stat.stat.name} className="stat-row">
                            <span className="stat-name">{formatStatName(stat.stat.name)}</span>
                            <span className="stat-value">{stat.base_stat}</span>
                            <div className="stat-bar-container">
                                <div 
                                    className={`stat-bar ${stat.stat.name}`}
                                    style={{ width: `${(stat.base_stat / maxStat) * 100}%` }}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="stat-row">
                        <span className="stat-name"><strong>Total</strong></span>
                        <span className="stat-value">
                            <strong>{pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0)}</strong>
                        </span>
                        <div></div>
                    </div>
                </div>
            </div>

            {/* Abilities */}
            <div className="section">
                <h2 className="section-title">⚡ Habilidades</h2>
                <div className="abilities-grid">
                    {pokemon.abilities.map((ability) => (
                        <div 
                            key={ability.slot} 
                            className={`ability-card ${ability.is_hidden ? 'hidden' : ''}`}
                        >
                            <span className="ability-name">
                                {ability.ability.name.replace('-', ' ')}
                            </span>
                            {ability.is_hidden && (
                                <span className="ability-hidden-tag">(Oculta)</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Species & Forms */}
            <div className="section">
                <h2 className="section-title">🧬 Especie y Formas</h2>
                <div className="info-grid">
                    <div className="info-item">
                        <div className="info-label">Especie</div>
                        <div className="info-value">{pokemon.species.name}</div>
                    </div>
                    <div className="info-item">
                        <div className="info-label">Es forma por defecto</div>
                        <div className="info-value">{pokemon.is_default ? 'Sí' : 'No'}</div>
                    </div>
                </div>
                {pokemon.forms.length > 0 && (
                    <>
                        <h3 style={{ marginTop: '20px', marginBottom: '10px' }}>Formas disponibles</h3>
                        <div className="forms-list">
                            {pokemon.forms.map((form) => (
                                <span key={form.name} className="form-tag">{form.name}</span>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Cries/Sonidos */}
            <div className="section">
                <h2 className="section-title">🔊 Sonidos</h2>
                <div className="cries-container">
                    {pokemon.cries.latest && (
                        <div className="cry-item">
                            <label>Actual</label>
                            <audio controls src={pokemon.cries.latest}>
                                Tu navegador no soporta audio.
                            </audio>
                        </div>
                    )}
                    {pokemon.cries.legacy && (
                        <div className="cry-item">
                            <label>Clásico</label>
                            <audio controls src={pokemon.cries.legacy}>
                                Tu navegador no soporta audio.
                            </audio>
                        </div>
                    )}
                </div>
            </div>

            {/* Held Items */}
            <div className="section">
                <h2 className="section-title">🎒 Items que puede llevar</h2>
                {pokemon.held_items.length > 0 ? (
                    <div className="held-items-grid">
                        {pokemon.held_items.map((item) => (
                            <div key={item.item.name} className="held-item-card">
                                <span className="held-item-name">
                                    {item.item.name.replace('-', ' ')}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-items">Este Pokémon no porta items de forma natural.</p>
                )}
            </div>

            {/* Game Indices */}
            <div className="section">
                <h2 className="section-title">🎮 Índices de Juego</h2>
                <div className="game-indices-grid">
                    {pokemon.game_indices.map((gi) => (
                        <span key={gi.version.name} className="game-index-tag">
                            <strong>{gi.version.name}</strong>: #{gi.game_index}
                        </span>
                    ))}
                </div>
            </div>

            {/* Moves */}
            <div className="section">
                <h2 className="section-title">⚔️ Movimientos ({pokemon.moves.length})</h2>
                <div className="moves-container">
                    <div className="moves-grid">
                        {pokemon.moves.map((move) => (
                            <span key={move.move.name} className="move-tag">
                                {move.move.name.replace('-', ' ')}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


function checkPokemonId(pokemonId: string | undefined): boolean {
    if (!pokemonId) return false

    const id = Number(pokemonId)
    console.log("Valid pokemon ID:", id)
    if (isNaN(id) || id <= 0) return false

    return true
}

function formatStatName(name: string): string {
    const statNames: Record<string, string> = {
        'hp': 'HP',
        'attack': 'Ataque',
        'defense': 'Defensa',
        'special-attack': 'At. Especial',
        'special-defense': 'Def. Especial',
        'speed': 'Velocidad'
    };
    return statNames[name] || name;
}