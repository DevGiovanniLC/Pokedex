import { useState, useEffect, useRef } from "react";
import './PokemonList.css';
import PokemonCard from "./PokemonCard";
import PokemonDetails, { type PokemonDetailsHandle } from "./PokemonDetails";
import type { PokemonPreview } from "../../models/Pokemon";
import PokemonService from "../../services/PokemonService";
import { type RowComponentProps, List } from 'react-window';


const ITEMS_PER_ROW = 6;

interface PokemonListProps {
    pokemonName: string;
    pokemonType: string;
    order: string;
}

export default function PokemonList(filter: PokemonListProps) {

    const { pokemonName, pokemonType, order } = filter;
    const [errorText, setErrorText] = useState<string>("Pokemon no encontrado.");
    const [pokemonRows, setPokemonRows] = useState<PokemonPreview[][]>([]);
    const detailsRef = useRef<PokemonDetailsHandle>(null);

    useEffect(() => {
        PokemonService.getPokemonListPreviewFilterBy(pokemonName, pokemonType, order).then(async pokemons => {
            const rows = Array.from(
                { length: Math.ceil(pokemons.length / ITEMS_PER_ROW) },
                (_, i) => pokemons.slice(i * ITEMS_PER_ROW, i * ITEMS_PER_ROW + ITEMS_PER_ROW)
            );
            setPokemonRows(rows);
        }).catch(() => {
            setPokemonRows([]);
            setErrorText("Error obteniendo datos de los Pokémon. Por favor, inténtalo de nuevo más tarde.");
        });
    }, [pokemonName, pokemonType, order]);

    const openDialog = (pokemon: PokemonPreview) => {
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
                rowProps={{ pokemon: pokemonRows, onClickPokemon: openDialog }}
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
            ))}
        </div>
    )
}