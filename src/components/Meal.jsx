export default function Meal()
{
    return (
        <li className="meal-item">
            <article>
                <img src={null} alt="placeholder" />
                <h3>Mac & Cheese</h3>
                <span className="meal-item-price">8.99$</span>
                <p className="meal-item-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit consequuntur reprehenderit aliquam asperiores. Perferendis, unde. Illo nobis nisi illum libero, accusantium provident culpa molestiae aliquam sapiente voluptas, corrupti a vitae.</p>
                <button className="button meal-item-actions">Add to Cart</button>
            </article>
        </li>
    )
}