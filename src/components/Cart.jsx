import { useContext } from 'react';
import { AppContext } from '../state/AppContext.jsx';
import { useRef, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';

/**
 * A Cart component modal that manages the items on the cart
 * Utilizes refs to handle the open and closing of the modal (useRef, forwardRef, useImperativeHandle)
 * Uses createPortal to render the modal in it's own DOM node
 * Uses AppContext to manage the state of the cart items and the fn(s) required to handle the modal
 * Has a local total fn that calculates the total price for the items of the cart
 */
const Cart =  forwardRef(function Cart({onCartClose, onCartConfirm}, ref)
{
    const { cartItems: items, handleItemRemoval: onItemRemove, handleItemAddition: onItemAdd} = useContext(AppContext);
    const cartDialog = useRef(null);

    useImperativeHandle(ref, () => {
        return {
            open() {
                cartDialog.current.showModal();
            },
            close() {
                cartDialog.current.close();
            }
        }
    }, []);

    function total()
    {
        let total = 0;

        items.forEach(item => {
            total += item.price * item.quantity;
        })

        if(!total)
        {
            return undefined;
        }

        return total;

    }

    return (
        createPortal(<dialog className="cart modal" ref={cartDialog} onClose={() => onCartClose("close-cart")}>
            <h2>Your Cart</h2>
            <ul>
                {items.map(item => {
                    return (
                        <li className="cart-item" key={item.id}>
                            <p>
                                {item.name} - {item.quantity} X ${item.price * item.quantity}
                            </p>
                            <div className="modal-actions cart-items-action">
                                <span className="cart-item-actions">
                                    <button onClick={() => onItemRemove(item.id)}>-</button>
                                </span>

                                <span>{item.quantity}</span>

                                <span className="cart-item-actions">
                                    <button onClick={() => onItemAdd(item.id)}>+</button>
                                </span>
                            </div>
                        </li>
                    )
                })}

                <span className="cart-total modal-actions">{total() ? `$${total()}` : null}</span>

                <div className="modal-actions">
                    <button type="button" className="text-button" onClick={() => onCartClose("close-cart")}>Close</button>
                    <button className="button" onClick={onCartConfirm}>Go to Checkout</button>
                </div>

            </ul>
        </dialog>,
        document.getElementById("modal"))
    )
});

export default Cart;