import { useRef, forwardRef, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';

const Cart =  forwardRef(function Cart({items, onCartClose, onCartConfirm, onItemRemove, onItemAdd}, ref)
{
    const cartDialog = useRef(ref);

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
        createPortal(<dialog className="cart modal" ref={cartDialog}>
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

                <span className="cart-total modal-actions">${total()}</span>

                <div className="modal-actions">
                    <button type="button" className="text-button" name="close-cart" onClick={onCartClose}>Close</button>
                    <button className="button" onClick={onCartConfirm}>Go to Checkout</button>
                </div>

            </ul>
        </dialog>,
        document.getElementById("modal"))
    )
});

export default Cart;