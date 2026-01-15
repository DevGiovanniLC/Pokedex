import './PokemonOrder.css';

function PokemonOrder({ order, setOrder }: { order: string; setOrder: (order: string) => void }) {
    return (
        <div className="pokemon-order">
            <select 
                name="Orden" 
                id="pokemon-order" 
                className="pokemon-order__select"
                value={order} 
                onChange={(e) => setOrder(e.target.value)}
            >
                <option value="1">ID ⬆</option>
                <option value="10">ID ⬇</option>
                <option value="2">A-Z</option>
                <option value="20">Z-A</option>
                <option value="30">Altura ⬇</option>
                <option value="3">Altura ⬆</option>
                <option value="40">Peso ⬇</option>
                <option value="4">Peso ⬆</option>
                <option value="50">Experiencia base ⬇</option>
                <option value="5">Experiencia base ⬆</option>
            </select>
        </div>
    );
}

export default PokemonOrder;