import useHttp from '../hooks/useHttp.js';
import Meal from './Meal.jsx';

const configRequest = {}

export default function Meals()
{
    const {
        isLoading,
        data: meals,
        error
    } = useHttp("http://localhost:3000/meals", configRequest, []);

    if(isLoading)
    {
        return <p>Fetching meals...</p>
    }

    return (
        <ul id="meals">
            {meals.map(meal => {
                return <Meal key={meal.id} meal={meal}/>
            })}
        </ul>
    )
}