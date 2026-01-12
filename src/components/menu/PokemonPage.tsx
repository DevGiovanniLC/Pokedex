
import Constants from '../../Constants';
import './PokemonPage.css';

export default function PokemonPage({ page, setPage }: { page: number, setPage: React.Dispatch<React.SetStateAction<number>> }) {
    
    const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = Number(e.target.value);

        // Si no es un número válido, establecer página 1
        if (isNaN(value)) {
            setPage(1);
            return;
        }

        // Aplicar límites
        if (value < 1) {
            value = 1;
        } else if (value > Constants.MAX_POKEMON_PAGE) {
            value = Constants.MAX_POKEMON_PAGE;
        }

        setPage(value);
    };

    const handlePrevious = () => {
        setPage(page > 1 ? page - 1 : 1);
    };

    const handleNext = () => {
        setPage(page < Constants.MAX_POKEMON_PAGE ? page + 1 : Constants.MAX_POKEMON_PAGE);
    };
    
    return (
        <div className='page-menu'>
            <button className='page-button' onClick={handlePrevious}>&larr;</button>
            <input 
                type="number" 
                value={page} 
                onChange={handlePageChange} 
                min={1} 
                max={Constants.MAX_POKEMON_PAGE}
                aria-label="Página"
            />
            <button className='page-button' onClick={handleNext}>&rarr;</button>     
        </div>
    );
}