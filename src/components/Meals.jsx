import Meal from './Meal.jsx';
import { useState, useEffect } from 'react';

/**
 * Meals component
 * Fetches a list of meals from the backend API
 * Utilizes useEffect in order to fetch the data from the backend API
 * Manages the state of the meals with useState along with error handling and loading management
 */
export default function Meals()
{
    const [isLoading, setLoading] = useState(true);
    const [meals, setMeals] = useState([]);
    const [errors, setErrors] = useState("");

    useEffect(() => {
        // Fetches the data from the backend API
        async function getMealsData()
        {
            const res = await fetch('http://localhost:3000/meals');
            const data = await res.json();

            if(!res.ok)
            {
                setErrors("Something went wrong while trying to fetch the meals data...");
                setLoading(false);
            }

            // Sets the data as state in order to be managed
            setMeals(data);
            setLoading(false);
        }

        getMealsData();
    }, [])

    return (
        <ol id="meals">
            {isLoading && <p className="center">Please wait while we are fetching the data...</p>}
            {(!isLoading && !errors) && meals.map((meal) => {
                return <Meal key={meal.id} name={meal.name} price={meal.price} description={meal.description} image={meal.image}/>
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