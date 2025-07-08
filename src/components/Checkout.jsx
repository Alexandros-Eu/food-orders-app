import { useActionState, forwardRef, useImperativeHandle, useRef, useContext } from 'react';
import { AppContext } from '../state/AppContext.jsx';
import { createPortal } from 'react-dom';

/**
 * A Checkout component modal that manages the form in order to checkout
 * Utilizes refs to handle the open and closing of the modal (useRef, forwardRef, useImperativeHandle)
 * Uses createPortal to render the modal in it's own DOM node
 * Uses AppContext to access the fn(s) required to handle the modal
 * The form handles validation and error handling through use useActionState hook
 * If data is correct it's sent to be stored in the backend 
 */
const Checkout = forwardRef(function Checkout({onCheckoutClose}, ref)
{
    const errors = [];
    const { cartItems: items} = useContext(AppContext);
    const checkoutDialog = useRef(null);

    useImperativeHandle(ref, () => {
        return {
            open() {
                checkoutDialog.current.showModal();
            },
            close() {
                checkoutDialog.current.close();
            }
        }
    }, [])

    // Handles form submission: validates inputs, sends order, manages errors 
    async function onCheckoutAction(prevState, formData)
    {
        const name = formData.get("name");
        const email = formData.get("email");
        const street = formData.get("address");
        const postalCode = formData.get("postal-code");
        const city = formData.get("city");

        // Validate each field and collect errors
        if(!name.trim())
        {
            errors.push("You must fill a name for your order");
        }

        if(!email.includes("@") || !email)
        {
            errors.push("You must provide a valid email address");
        }

        if(!street.trim())
        {
            errors.push("You must provide a street address for your order");
        }

        if(!postalCode.trim())
        {
            errors.push("You must provide a postal code for your order");
        }

        if(!city.trim())
        {
            errors.push("A city is required for the order");
        }



        if(errors.length > 0)
        {
            return { errors: errors}
        }

        let res;

        try {
            // Send order data to backend API
            res = await fetch("http://localhost:3000/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    order: {
                        customer: {
                            name: name,
                            email: email,
                            street: street,
                            "postal-code": postalCode,
                            city: city
                        },
                        items
                    }
                })
            })
        }
        catch(e)
        {
            console.log(e);
        }

        if(!res.ok)
        {
            throw new Error("Oops, something went wrong while trying to send data to the backend!");
        }

        onCheckoutClose("open-success");
        return { errors: null};
        
    }

    // useActionState manages form state and submission status
    const [checkoutState, checkoutAction, isCheckoutPending] = useActionState(onCheckoutAction, {errors: null})


    return (
        createPortal(<dialog className="modal" ref={checkoutDialog} disabled={isCheckoutPending} onClose={() => onCheckoutClose("close-checkout")}>
            <form>
                <h2>Checkout</h2>
                <p>Total amount:</p>

                <div className="control">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" name="name" id="name" required/>
                </div>


                <div className="control">
                    <label htmlFor="email">E-mail Address</label>
                    <input type="email" name="email" id="email" required/>
                </div>


                <div className="control">   
                    <label htmlFor="address">Street</label>
                    <input type="text" name="address" id="address" required/>
                </div>


                <div className="control-row">
                    <div className="control">
                        <label htmlFor="postal-code">Postal Code</label>
                        <input type="text" name="postal-code" id="postal-code" required/>
                    </div>


                    <div className="control">
                        <label htmlFor="city">City</label>
                        <input type="text" name="city" id="city" required/>
                    </div>

                </div>
   

                <div className="modal-actions">
                    {isCheckoutPending && <p style="color: red;">Please wait while we process the form</p>}
                    <button type="button" className="text-button" onClick={() => onCheckoutClose("close-checkout")}>Close</button>
                    <button formAction={checkoutAction} className="button">Submit Order</button>
                </div>

                {checkoutState.errors && (
                    <div className="error">
                        <h2>Error</h2>

                        {checkoutState.errors.map((error, index) => {
                            return <p key={index}>{error}</p>
                        })}

                    </div>
                )}
            </form>
        </dialog>,
        document.getElementById("modal"))
    )
});

export default Checkout;