import {heroesFetching, heroesFetched, heroesFetchingError} from '../components/heroesList/heroesSlice'
import { filtersFetched } from '../components/heroesFilters/filtersSlice';

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

}


export const fetchFilters = (request) => (dispatch) => {
    request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => console.log('error'))
}