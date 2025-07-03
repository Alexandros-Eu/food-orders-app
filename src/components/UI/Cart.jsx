import { useContext } from 'react';
import { Modal } from './Modal.jsx';
import { Button } from './Button.jsx';
import { CartContext } from '../../store/CartContext.jsx';
import { currencyFormatter } from '../../util/formatting.js';


export default function Cart()
{
    const cartCtx = useContext(CartContext);
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
        return  totalPrice += item.price * item.quantity
    }, 0)

    return (
        <Modal className="modal">
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.map((item) => {
                    return <li key={item.id}>{item.name} - {item.price}</li>
                })}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly>Close</Button>
                <Button>Go to Checkout</Button>
            </p>
        </Modal>
    )
}