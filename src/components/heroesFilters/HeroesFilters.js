import { useHttp } from "../../hooks/http.hook";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { filterChanged, fetchFilters, selectAll } from "./filtersSlice";


// Задача для этого компонента:
// 1) Фильтры должны формироваться на основании загруженных данных ++++++++++
// 2) Фильтры должны отображать только нужных героев при выборе ++++++++++++++++
// 3) Активный фильтр имеет класс active -----------------
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

function HeroesFilters() {

    const filters = useSelector(selectAll)
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchFilters(request))
        console.log("запрос был")
    }, []);

    const onChangeFilter = (element) => {
        dispatch(filterChanged(element))
    }

    const renderButtons = (arr) => {
        return arr.map(({description, clazz, name}) => {
            return <button 
                        key={name}
                        onClick={() => onChangeFilter(name)}
                        className={clazz}>{description}</button>;
        });
    };

    const buttons = renderButtons(filters);
    


    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {buttons}
                </div>
            </div>
        </div>
    );
}

export default HeroesFilters;