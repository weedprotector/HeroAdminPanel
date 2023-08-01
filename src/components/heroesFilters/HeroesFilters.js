import { useHttp } from "../../hooks/http.hook";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { filterChanged, filtersFetched } from "../../actions";

// Задача для этого компонента:
// 1) Фильтры должны формироваться на основании загруженных данных ++++++++++
// 2) Фильтры должны отображать только нужных героев при выборе ++++++++++++++++
// 3) Активный фильтр имеет класс active -----------------
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

function HeroesFilters() {

    const {filters} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => console.log('error'))
        
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