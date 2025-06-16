export default function Meal({name, price, description, image, onAdd})
{
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
                    <button className="button meal-item-actions" onClick={onAdd}>Add to Cart</button>
                </form>
            </article>
        </li>
    )
}