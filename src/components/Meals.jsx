import Meal from './Meal.jsx';
import { useState, useEffect } from 'react';

export default function Meals({...props})
{
    const [isLoading, setLoading] = useState(true);
    const [meals, setMeals] = useState([]);
    const [errors, setErrors] = useState("");

    useEffect(() => {

        async function getMealsData()
        {
            const res = await fetch('http://localhost:3000/meals');
            const data = await res.json();

            if(!res.ok)
            {
                setErrors("Something went wrong while trying to fetch the meals data...");
                setLoading(false);
            }

            setMeals(data);
            setLoading(false);
        }

        getMealsData();
    }, [])

    return (
        <ol id="meals">
            {isLoading && <p className="center">Please wait while we are fetching the data...</p>}
            {(!isLoading && !errors) && meals.map((meal) => {
                return <Meal key={meal.id} name={meal.name} price={meal.price} description={meal.description} image={meal.image} {...props}/>
            })}
            {errors && (
                <div className="error">
                    <h2>Error!</h2>
                    <p>{errors}</p>
                </div>
            )}
        </ol>
    )
}