import { useRef } from 'react';
import Constants from '../../Constants';
import './PokemonRange.css';

export default function PokemonRange({ pageSize, setPageSize }: { pageSize: number, setPageSize: React.Dispatch<React.SetStateAction<number>> }) {

    const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = Number(e.target.value);

        if (isNaN(value)) {
            setPageSize(Constants.MIN_POKEMON_PER_PAGE);
            return;
        }

        if (value < Constants.MIN_POKEMON_PER_PAGE) {
            value = Constants.MIN_POKEMON_PER_PAGE;
        } else if (value > Constants.MAX_POKEMON_PER_PAGE) {
            value = Constants.MAX_POKEMON_PER_PAGE;
        }

        setPageSize(value);
    };

    const inputRangeRef = useRef<HTMLInputElement>(null);

    const focus = () => {
        inputRangeRef.current?.focus();
    }

    return (
        <div className="pokemon-range" onClick={focus}>
            <label htmlFor="input-range">Tamaño de página: </label>
            <input ref={inputRangeRef} id='input-range' type="number" value={pageSize} onChange={handleEndChange} min={Constants.MIN_POKEMON_PER_PAGE} max={Constants.MAX_POKEMON_PER_PAGE} />
        </div>
    )
}