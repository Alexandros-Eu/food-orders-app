import { useContext } from 'react';
import { AppContext } from '../state/AppContext.jsx';

/**
 * A Meal component displays information about a single meal and allows adding it to the cart
 * Uses AppContext to access the fn that handles adding a meal to the cart
 * @param {string} name - Name of the meal
 * @param {string} price - Price of the meal
 * @param {string} description - Description of the meal
 * @param {string} image - An image showcasing the meal
 */
export default function Meal({name, price, description, image})
{
    const { handleAddMeal: onAdd} = useContext(AppContext);

    // Prevent default form submission behavior
    function onSubmit(e)
    {
        e.preventDefault();
    }

    return (
        <li className="meal-item">
            <article>
                <form action="" onSubmit={onSubmit}>
                    <img src={`../backend/public/${image}`} alt="placeholder" />
                    <h3>{name}</h3>
                    <span className="meal-item-price">${price}</span>
                    <p className="meal-item-description">{description}</p>
                    <button className="button meal-item-actions" onClick={() => onAdd(name, price)}>Add to Cart</button>
                </form>
            </article>
        </li>
    )
}