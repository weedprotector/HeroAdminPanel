import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { createSelector } from 'reselect'

import { heroesFetching, heroesFetched, heroesFetchingError, heroDelete } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

// Задача для этого компонента:
// 1) При клике на "крестик" идет удаление персонажа из общего состояния +++++
// Усложненная задача:
// 2) Удаление идет и с json файла при помощи метода DELETE --------

const HeroesList = () => {
    const filteredHeroesSelector = createSelector(
        (state) => state.filters.activeFilter,
        (state) => state.heroes.heroes,
        (activeFilter, heroes) => {
            if (activeFilter === 'all') {
                console.log('render')
                return heroes;
            } else {
                return heroes.filter(item => item.element === activeFilter)
            }
        }
        
    )

    const filteredHeroes = useSelector(filteredHeroesSelector)
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const onDelete = (id) => {
        dispatch(heroDelete(filteredHeroes, id))
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition
                    key={id}
                    timeout={500}
                    classNames='hero'>
                    <HeroesListItem key={id} onDelete={() => onDelete(id)} {...props} />
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);

    return (
        <ul>
            <TransitionGroup component='ul'>
                {elements}
            </TransitionGroup>
        </ul>
    )
}

export default HeroesList;