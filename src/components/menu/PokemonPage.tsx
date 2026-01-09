
import Constants from '../../constants';
import './PokemonPage.css';

export default function PokemonPage({ page, setPage }: { page: number, setPage: React.Dispatch<React.SetStateAction<number>> }) {
    
    const handleMaxLimit = () => {
        if (page < Constants.MAX_POKEMON_PAGE){
            setPage(page + 1)
        }
    }
    
    return (
        <div className='page-menu'>
            <button className='page-button' onClick={() => setPage(page > 1 ? page - 1 : 1)}>&larr;</button>
            <span>{page}</span>
            <button className='page-button' onClick={handleMaxLimit}>&rarr;</button>     
        </div>
    );
}