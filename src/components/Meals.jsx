import Meal from './Meal.jsx';
import { useState, useEffect } from 'react';

export default function Meals()
{
    const [meals, setMeals] = useState([]);

    useEffect(() => {

        async function getMealsData()
        {
            const res = await fetch('http://localhost:3000/meals');
            const data = await res.json();

            if(!res.ok)
            {
                throw new Error("Couldn't load data!");
            }
            setMeals(data);
        }

        getMealsData();
    }, [])

    console.log(meals);

    return (
        <ol id="meals">
            {meals.map((meal) => {
                return <Meal key={meal.id} name={meal.name} price={meal.price} description={meal.description} image={meal.image}/>
            })}
        </ol>
    )
}