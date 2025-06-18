import { useRef, forwardRef, useImperativeHandle } from 'react';

const Cart =  forwardRef(function Cart({items, onCartClose}, ref)
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
        <dialog className="cart modal" ref={cartDialog}>
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
                                    <button>-</button>
                                </span>

                                <span>{item.quantity}</span>

                                <span className="cart-item-actions">
                                    <button>+</button>
                                </span>
                            </div>
                        </li>
                    )
                })}

                <span className="cart-total modal-actions">${total()}</span>

                <div className="modal-actions">
                    <button className="text-button" onClick={onCartClose}>Close</button>
                    <button className="button">Go to Checkout</button>
                </div>

            </ul>
        </dialog>
    )
});

export default Cart;