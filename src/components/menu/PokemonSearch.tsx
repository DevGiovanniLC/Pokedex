import './PokemonSearch.css';


function PokemonSearch({ text, setText }: { text: string; setText: (text: string) => void }) {

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = String(event.target.value);
        setText(query);
    }

    return (
        <div className="pokemon-search">
            <input
                className="pokemon-search__input"
                type="text"
                value={text}
                onChange={handleSearchChange}
                placeholder="Busca un Pokémon"
            />
        </div>
    );
}

export default PokemonSearch;