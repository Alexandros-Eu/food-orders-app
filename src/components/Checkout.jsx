import { useContext } from 'react';
import Modal from './UI/Modal.jsx';
import Input from './UI/Input.jsx';
import Button from './UI/Button.jsx';
import Error from './UI/Error.jsx';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import { currencyFormatter } from '../util/formatting.js';
import useHttp from '../hooks/useHttp.js';

const configRequest = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
}

export default function Checkout()
{
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
        return totalPrice += item.price * item.quantity
    }, 0)
    const {isLoading: isSending, data, error, sendRequest, clearData} = useHttp("http://localhost:3000/orders", configRequest);

    function handleClose()
    {
        userProgressCtx.hideCheckout();
    }

    function handleFinish()
    {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        const fd = new FormData(e.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }))
    }

    let actions = (
        <>
            <Button type="button" onClick={handleClose} textOnly>Close</Button>
            <Button className="button">Sumbit Order</Button>
        </>
    )

    if(isSending)
    {
        actions = (
            <>
                <span>Sending order data...</span>
            </>
        )
    }

    if(data && !error)
    {
        return (
            <Modal className="modal" open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
                <h2>Success!</h2>
                <p>Your order has been submitted successfully!</p>
                <p>We will get back to you with more details via email within the next few minutes.</p>
                <p className="modal-actions"> 
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        )

    }
    

    return (
        <Modal className="modal" open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full Name" id="name" type="text"/>
                <Input label="E-mail Address" id="email" type="email"/>
                <Input label="Street" id="street" type="street"/>
                <div className="control-row">
                    <Input label="Postal Code" id="postal-code" type="text"/>
                    <Input label="City" id="city" type="text"/>
                </div>
                {error && <Error title="Failed to submit order..." message={error}/>}
                <div className="modal-actions">
                    {actions}
                </div>
            </form>
        </Modal>
    )
}