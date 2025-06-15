export default function Meal({name, price, description, image})
{
    return (
        <li className="meal-item">
            <article>
                <img src={`../backend/public/${image}`} alt="placeholder" />
                <h3>{name}</h3>
                <span className="meal-item-price">{price}</span>
                <p className="meal-item-description">{description}</p>
                <button className="button meal-item-actions">Add to Cart</button>
            </article>
        </li>
    )
}