
export default function PokemonRange({ pageSize: end, setPageSize: setEnd }: { pageSize: number, setPageSize: React.Dispatch<React.SetStateAction<number>> }) {

    const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (!isNaN(value) && value > 1) {
            setEnd(value);
        }
    };

    return (
        <>
        <div>
            <label>Page size: </label>
            <input type="number"  value={end} onChange={handleEndChange} min={2} max={151}/>
        </div>
        </>
    )
}