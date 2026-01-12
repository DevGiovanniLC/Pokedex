import { useRef } from 'react';
import Constants from '../../Constants';
import './PokemonRange.css';

export default function PokemonRange({ pageSize: end, setPageSize: setEnd }: { pageSize: number, setPageSize: React.Dispatch<React.SetStateAction<number>> }) {

    const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);

        if (!isNaN(value) && value >= Constants.MIN_POKEMON_PER_PAGE) {
            setEnd(value);
        } else if (value > Constants.MAX_POKEMON_PER_PAGE) {
            setEnd(Constants.MAX_POKEMON_PER_PAGE);
        } else {
            setEnd(Constants.MIN_POKEMON_PER_PAGE);
        }
    };

    const inputRangeRef = useRef<HTMLInputElement>(null);

    const focus = () => {
        inputRangeRef.current?.focus();
    }

    return (
        <div className="pokemon-range" onClick={focus}>
            <label htmlFor="input-range">Tamaño de página: </label>
            <input ref={inputRangeRef} id='input-range' type="number" value={end} onChange={handleEndChange} min={Constants.MIN_POKEMON_PER_PAGE} max={Constants.MAX_POKEMON_PER_PAGE} />
        </div>
    )
}