import { useContext } from 'react';
import Modal from './Modal.jsx';
import CartItem from './CartItem.jsx';
import Button from './Button.jsx';
import CartContext  from '../../store/CartContext.jsx';
import UserProgressContext  from '../../store/UserProgressContext.jsx';
import { currencyFormatter } from '../../util/formatting.js';


export default function Cart()
{
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
        return  totalPrice += item.price * item.quantity
    }, 0)

    function handleCartClose()
    {
        userProgressCtx.hideCart();
    }

    return (
        <Modal className="modal" open={userProgressCtx.progress === 'cart'}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) => {
                    return <CartItem key={item.id} name={item.name} quantity={item.quantity} price={item.price} onIncrease={() => cartCtx.addItem(item)} onDecrease={() => cartCtx.removeItem(item.id)}/>
                })}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button onClick={handleCartClose} textOnly>Close</Button>
                <Button onClick={handleCartClose}>Go to Checkout</Button>
            </p>
        </Modal>
    )
}