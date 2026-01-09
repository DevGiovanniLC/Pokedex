import { useState, useRef, useImperativeHandle, forwardRef } from "react";
import './PokemonDetails.css';
import type { Pokemon } from "../../models/Pokemon";

interface PokemonDetailsProps {
    pokemon: Pokemon | null;
}

export interface PokemonDetailsHandle {
    openDialog: (pokemon: Pokemon) => void;
}

const PokemonDetails = forwardRef<PokemonDetailsHandle, PokemonDetailsProps>((props, ref) => {

    const [pokemon, setPokemon] = useState<Pokemon | null>(props.pokemon);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
        openDialog(pokemon: Pokemon) {
            dialogRef.current?.showModal();
            setPokemon(pokemon);
            dialogRef.current?.scrollTo(0, 0);
        }
    }));

    const closeDialog = () => {
        dialogRef.current?.close();
    };

    const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        const dialog = dialogRef.current;
        if (dialog && e.target === dialog) {
            const rect = dialog.getBoundingClientRect();
            if (
                e.clientX < rect.left ||
                e.clientX > rect.right ||
                e.clientY < rect.top ||
                e.clientY > rect.bottom
            ) {
                closeDialog();
            }
        }
    };

    const primaryType = pokemon?.types[0] || 'normal';

    return (
        <>
            <dialog ref={dialogRef} onClick={handleDialogClick} className={`dialog-${primaryType}`}>
                <div className="pokemon-details-content">

                    <div className="pokemon-header">
                        <h2>{pokemon?.name}</h2>
                        <span className="pokemon-id">#{pokemon?.id}</span>
                    </div>

                    <div className="pokemon-images">
                        <img className="official-artwork" src={pokemon?.officialArtwork} alt={pokemon?.name} />
                    </div>

                    <div className="pokemon-types">
                        {pokemon?.types.map((type, index) => (
                            <span key={index} className={`type-badge type-${type}`}>{type}</span>
                        ))}
                    </div>

                    <div className="pokemon-info">
                        <div className="info-row">
                            <div className="info-item">
                                <span className="info-label">Altura</span>
                                <span className="info-value">{pokemon?.height ? (pokemon.height / 10).toFixed(1) : 0} m</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Peso</span>
                                <span className="info-value">{pokemon?.weight ? (pokemon.weight / 10).toFixed(1) : 0} kg</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Experiencia Base</span>
                                <span className="info-value">{pokemon?.baseExperience}</span>
                            </div>
                        </div>
                    </div>

                    <div className="pokemon-abilities">
                        <h3>Habilidades</h3>
                        <div className="abilities-list">
                            {pokemon?.abilities.map((ability, index) => (
                                <span key={index} className="ability-badge">{ability}</span>
                            ))}
                        </div>
                    </div>

                    <div className="pokemon-stats">
                        <h3>Estadísticas</h3>
                        {pokemon?.stats.map((stat, index) => (
                            <div key={index} className="stat-row">
                                <span className="stat-name">{stat.name}</span>
                                <div className="stat-bar-container">
                                    <div
                                        className="stat-bar"    
                                        style={{ width: `${(stat.value / 255) * 100}%` }}
                                    ></div>
                                </div>
                                <span className="stat-value">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </dialog>
        </>
    );
});

export default PokemonDetails;