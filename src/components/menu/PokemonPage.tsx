
import './PokemonPage.css';

export default function PokemonPage({ page, setPage }: { page: number, setPage: React.Dispatch<React.SetStateAction<number>> }) {
    return (
        <>
        <div className='page-menu'>
            <button className='page-button' onClick={() => setPage(page > 1 ? page - 1 : 1)}>&larr;</button>
            <span>{page}</span>
            <button className='page-button' onClick={() => setPage(page + 1)}>&rarr;</button>     
        </div>
        </>
    );
}