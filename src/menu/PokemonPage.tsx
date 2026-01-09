export default function PokemonPage({ page, setPage }: { page: number, setPage: React.Dispatch<React.SetStateAction<number>> }) {
    return (
        <>
        <div>
            <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>Previous</button>
            <span>{page}</span>
            <button onClick={() => setPage(page + 1)}>Next</button>     
        </div>
        </>
    );
}