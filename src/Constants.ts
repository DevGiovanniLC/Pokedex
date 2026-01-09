const Constants = {
    DEFAULT_POKEMON_PER_PAGE: 20,
    MIN_POKEMON_PER_PAGE: 1,
    MAX_POKEMON_PER_PAGE: 151,

    DEFAULT_POKEMON_PAGE: 1,
    MIN_POKEMON_PAGE: 1,
    MAX_POKEMON_PAGE: 50,

    API: 'https://pokeapi.co/api/v2',
    MAX_POKEMON_ID: await fetch('https://pokeapi.co/api/v2/pokemon').then(res => res.json()).then(data => data.count),
}

export default Constants;