import useHttp from '../hooks/useHttp.js';
import Meal from './Meal.jsx';
import Error from './UI/Error.jsx';

const configRequest = {}

export default function Meals()
{
    const {
        isLoading,
        data: meals,
        error
    } = useHttp("http://localhost:3000/mealssss", configRequest, []);

    if(isLoading)
    {
        return <p className="center">Fetching meals...</p>
    }

    if(error)
    {
        return <Error title="Failed to fetch meals" message={error}/>
    }

    return (
        <ul id="meals">
            {meals.map(meal => {
                return <Meal key={meal.id} meal={meal}/>
            })}
        </ul>
    )
}