const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    activeFilter: 'all',
    filteredHeroes: []
}

const reducer = (state = initialState, action) => {
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
                filteredHeroes: state.activeFilter === 'all' ?
                                action.payload :
                                action.payload.filter(item => item.element === state.activeFilter)
            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes: state.activeFilter === 'all' ?
                                state.heroes :
                                state.heroes.filter(item => item.element === state.activeFilter)
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_DELETE':
            return {
                ...state,
                heroes: action.payload,
                filteredHeroes: state.activeFilter === 'all' ?
                                action.payload :
                                action.payload.filter(item => item.element === state.activeFilter)
            }
        case 'HERO_ADD':
            let newHeroesArr = [...state.heroes, action.payload]
            return {
                ...state,
                heroes: newHeroesArr,
                filteredHeroes: state.activeFilter === 'all' ?
                                newHeroesArr :
                                newHeroesArr.filter(item => item.element === state.activeFilter)
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload
            }
        case 'HEROES_FILTERED':
            return {
                ...state,
                filteredHeroes: state.activeFilter === 'all' ?
                                state.heroes :
                                state.heroes.filter(item => item.element === state.activeFilter)
            }
        default: return state
    }
}

export default reducer;