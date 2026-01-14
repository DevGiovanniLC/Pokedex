import { useState, useEffect, useRef } from "react";
import './PokemonList.css';
import PokemonCard from "./PokemonCard";
import PokemonDetails, { type PokemonDetailsHandle } from "./PokemonDetails";
import type { PokemonPreview } from "../../models/Pokemon";
import PokemonService from "../../services/PokemonService";
import { type RowComponentProps, List } from 'react-window';


interface PokemonListProps {
    pokemonName: string;
    pokemonType: string;
}

export default function PokemonList({ pokemonName, pokemonType }: PokemonListProps) {
    const [pokemonRows, setPokemonRows] = useState<PokemonPreview[][]>([]);
    const detailsRef = useRef<PokemonDetailsHandle>(null);
    const ITEMS_PER_ROW = 6;
    const [errorText, setErrorText] = useState<string>("Pokemon no encontrado.");

    useEffect(() => {
        PokemonService.getPokemonListPreviewFilterBy(pokemonName, pokemonType).then(async pokemons => {

            const rows = Array.from(
                { length: Math.ceil(pokemons.length / ITEMS_PER_ROW) },
                (_, i) => pokemons.slice(i * ITEMS_PER_ROW, i * ITEMS_PER_ROW + ITEMS_PER_ROW)
            );
            setPokemonRows(rows);
        }).catch(error => {
            console.error("Error fetching Pokémon list:", error);
            setPokemonRows([]);
            setErrorText("Error obteniendo datos de los Pokémon. Por favor, inténtalo de nuevo más tarde.");
        });
    }, [pokemonName, pokemonType]);

    const onClickPokemon = (pokemon: PokemonPreview) => {
        detailsRef.current?.openDialog(pokemon);
    };

    if (pokemonRows.length === 0) return (<p id="error-text">{errorText}</p>)

    return (
        <>
            <List
                id="pokemon-virtual-list"
                rowCount={pokemonRows.length}
                rowHeight={260}
                rowComponent={Row}
                rowProps={{ pokemon: pokemonRows, onClickPokemon }}
            />
            <PokemonDetails ref={detailsRef} />
        </>
    );
}

function Row({ index, style, pokemon, onClickPokemon }: RowComponentProps<{ pokemon: PokemonPreview[][], onClickPokemon: (pokemon: PokemonPreview) => void }>) {
    return (
        <div id="row-list" style={style} key={index}>
            {pokemon[index].map((pokemon) => (
                <PokemonCard
                    pokemon={pokemon}
                    onClick={() => onClickPokemon(pokemon)}
                />
            ))
            }
        </div>
    )
}