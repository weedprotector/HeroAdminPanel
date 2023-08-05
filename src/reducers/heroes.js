

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

/* const heroes = createReducer(initialState, builder => {
    builder
        .addCase(heroesFetching, state => {
            state.heroesLoadingStatus = 'loading';
        })
}) */

const heroes = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle',
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETE':
            return {
                ...state,
                heroes: action.payload
            }
        case 'HERO_ADD':
            let newHeroesArr = [...state.heroes, action.payload]
            return {
                ...state,
                heroes: newHeroesArr
            }
        default: return state
    }
}

export default heroes;