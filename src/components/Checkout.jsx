import { useActionState, forwardRef, useImperativeHandle, useRef, useContext, useState } from 'react';
import { AppContext } from '../state/AppContext.jsx';
import { createPortal } from 'react-dom';
import SubmitButton from './UI/SubmitButton.jsx';

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
    const { cartItems: items, clearCart} = useContext(AppContext);
    const checkoutDialog = useRef(null);
    const [errors, setErrors] = useState([]);
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        street: "",
        postalCode: "",
        city: ""
    })

    useImperativeHandle(ref, () => {
    return {
        open() {
            checkoutDialog.current.showModal();
        },
        close() {
            checkoutDialog.current.close();
        }
    }
}, []);

    // Handles form submission: validates inputs, sends order, manages errors 
    async function onCheckoutAction()
    {
        const validationErrors = [];

        // Validate each field and collect errors
        if(!inputs.name.trim())
        {
            validationErrors.push("You must fill a name for your order");
        }

        if(!inputs.email.includes("@") || !email)
        {
            validationErrors.push("You must provide a valid email address");
        }

        if(!inputs.street.trim())
        {
            validationErrors.push("You must provide a street address for your order");
        }

        if(!inputs.postalCode.trim())
        {
            validationErrors.push("You must provide a postal code for your order");
        }

        if(!inputs.city.trim())
        {
            validationErrors.push("A city is required for the order");
        }

        if(validationErrors.length > 0)
        {
            setErrors(validationErrors);
            return;
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
                            name: inputs.name,
                            email: inputs.email,
                            street: inputs.street,
                            "postal-code": inputs.postalCode,
                            city: inputs.city
                        },
                        items
                    }
                })
            })
            validationErrors.length = 0;
            setErrors([]);
            setInputs({
                name: "",
                email: "",
                street: "",
                postalCode: "",
                city: ""
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

        clearCart();
        onCheckoutClose("open-success");
        return { errors: null};
        
    }

    function handleInputChange(e, id)
    {
        setInputs({
            ...inputs,
            [id]: e.target.value
        });
    }

    return (
        createPortal(<dialog className="modal" ref={checkoutDialog} onClose={() => onCheckoutClose("close-checkout")}>
            <form action={onCheckoutAction} formNoValidate>
                <h2>Checkout</h2>
                <p>Total amount:</p>

                <div className="control">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" name="name" id="name" noValidate value={inputs.name} onChange={(e) => handleInputChange(e, "name")}/>
                </div>


                <div className="control">
                    <label htmlFor="email">E-mail Address</label>
                    <input type="email" name="email" id="email" noValidate value={inputs.email} onChange={(e) => handleInputChange(e, "email")}/>
                </div>


                <div className="control">   
                    <label htmlFor="address">Street</label>
                    <input type="text" name="address" id="address" noValidate value={inputs.street} onChange={(e) => handleInputChange(e, "street")}/>
                </div>


                <div className="control-row">
                    <div className="control">
                        <label htmlFor="postal-code">Postal Code</label>
                        <input type="text" name="postal-code" id="postal-code" noValidate value={inputs.postalCode} onChange={(e) => handleInputChange(e, "postalCode")}/>
                    </div>


                    <div className="control">
                        <label htmlFor="city">City</label>
                        <input type="text" name="city" id="city" noValidate value={inputs.city} onChange={(e) => handleInputChange(e, "city")}/>
                    </div>

                </div>
   

                <div className="modal-actions">
                    {/* {isCheckoutPending && <p style="color: red;">Please wait while we process the form</p>} */}
                    <button type="button" className="text-button" onClick={() => onCheckoutClose("close-checkout")}>Close</button>
                    <SubmitButton type="submit" className="button" msg="Submit Order"/>
                </div>

                {errors.length > 0 && (
                    <div className="error">
                        <h2>Error</h2>

                        {errors.map((error, index) => {
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