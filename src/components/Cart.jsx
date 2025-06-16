export default function Cart()
{
    return (
        <dialog className="cart modal">
            <h2>Your Cart</h2>
            <ul>
                <li className="cart-item">
                    <p>
                        Example Item 1
                    </p>
                    <div className="modal-actions cart-items-action">
                        <span className="cart-item-actions">
                            <button>-</button>
                        </span>

                        <span>1</span>

                        <span className="cart-item-actions">
                            <button>+</button>
                        </span>
                    </div>
                </li>

                <li className="cart-item">
                    <p>
                        Example Item 2
                    </p>
                    <div className="modal-actions cart-items-action">
                        <span className="cart-item-actions">
                            <button>-</button>
                        </span>

                        <span>1</span>

                        <span className="cart-item-actions">
                            <button>+</button>
                        </span>
                    </div>
                </li>

                <li className="cart-item">
                    <p>
                        Example Item 3
                    </p>
                    <div className="modal-actions cart-items-action">
                        <span className="cart-item-actions">
                            <button>-</button>
                        </span>

                        <span>1</span>

                        <span className="cart-item-actions">
                            <button>+</button>
                        </span>
                    </div>
                </li>

                <span className="cart-total modal-actions">$59.99</span>

                <div className="modal-actions">
                    <button className="text-button">Close</button>
                    <button className="button">Go to Checkout</button>
                </div>

            </ul>
        </dialog>
    )
}