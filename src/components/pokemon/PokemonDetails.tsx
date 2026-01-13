import { useState, useRef, useImperativeHandle, forwardRef } from "react";
import type { PokemonPreview } from "../../models/Pokemon";
import './PokemonDetails.css';
import { useNavigate } from "react-router";

export interface PokemonDetailsHandle {
    openDialog: (pokemon: PokemonPreview) => void;
}

const PokemonDetails = forwardRef<PokemonDetailsHandle>((_, ref) => {
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState<PokemonPreview | null>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
        openDialog(pokemon: PokemonPreview) {
            dialogRef.current?.showModal();
            setPokemon(pokemon);
            dialogRef.current?.scrollTo(0, 0);
        }
    }));

    const primaryType = pokemon?.type_primary || 'normal';

    return (
        <>
            <dialog ref={dialogRef} closedby="any" className={`type-${primaryType}`}>
                <div className={`pokemon-details-content`}>
                    <div className="close-button-container">
                        <button className="detail-button" onClick={() => navigate(`/pokedex/${pokemon?.id}`)}>🔍</button>
                        <button className="close-button" onClick={() => dialogRef.current?.close()}>×</button>
                    </div>
                    <div className="pokemon-header">
                        <h2>{pokemon?.name}</h2>
                        <span className="pokemon-id">#{pokemon?.id}</span>
                    </div>

                    <div className="pokemon-images">
                        <img className="official-artwork" src={pokemon?.sprite_artwork ?? ''} alt={pokemon?.name} loading="lazy" />
                    </div>

                    <div className="pokemon-types">
                        <span className={`type-badge type-${pokemon?.type_primary || 'normal'}`}>{pokemon?.type_primary || 'normal'}</span>
                        {pokemon?.type_secondary && (
                            <span className={`type-badge type-${pokemon.type_secondary}`}>{pokemon.type_secondary}</span>
                        )}
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
                                <span className="info-value">{pokemon?.base_experience}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
});

export default PokemonDetails;