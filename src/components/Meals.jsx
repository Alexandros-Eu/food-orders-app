import { useState, useEffect } from 'react';
import Meal from './Meal.jsx';

export default function Meals()
{
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        async function fetchMeals()
        {
            const res = await fetch("http://localhost:3000/meals");

            if(!res.ok)
            {
                // ...
            }

            const meals = await res.json();
            setMeals(meals);
        }

        fetchMeals();
    }, [])

    return (
        <ul id="meals">
            {meals.map(meal => {
                return <Meal key={meal.id} meal={meal}/>
            })}
        </ul>
    )
}