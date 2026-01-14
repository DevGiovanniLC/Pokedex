const Constants = {
    DEFAULT_POKEMON_PER_PAGE: 20,
    MIN_POKEMON_PER_PAGE: 1,
    MAX_POKEMON_PER_PAGE: 151,

    DEFAULT_POKEMON_PAGE: 1,
    MIN_POKEMON_PAGE: 1,
    MAX_POKEMON_PAGE: 50,

    API: 'http://localhost:3000',
    MAX_POKEMON_ID: await fetch('http://localhost:3000/pokemon').then(res => res.json()).then(data => data.total).catch(() => 151),
}

export default Constants;