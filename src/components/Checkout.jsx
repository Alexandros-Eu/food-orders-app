import { useActionState, forwardRef, useImperativeHandle, useRef } from 'react';

const Checkout = forwardRef(function Checkout(props, ref)
{
    const errors = [];
    const modal = useRef(ref);

    useImperativeHandle(ref, () => {
        return {
            open() {
                modal.current.showModal();
            },
            close() {
                modal.current.close();
            }
        }
    }, [])

    async function onCheckoutAction(prevState, formData)
    {
        const name = formData.get("name");
        const email = formData.get("email");
        const street = formData.get("address");
        const postalCode = formData.get("postal-code");
        const city = formData.get("city");

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

        if(errors)
        {
            return { errors: errors}
        }

        let res;

        try {
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
                        items: {
                            1: "Mac & Cheese"
                        }
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

        return { errors: null};
        
    }

    const [checkoutState, checkoutAction, isCheckoutPending] = useActionState(onCheckoutAction, {errors: null})


    return (
        <dialog className="modal" ref={modal}>
            <form action="" noValidate>
                <h2>Checkout</h2>
                <p>Total amount:</p>

                <div className="control">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" name="name" id="name"/>
                </div>


                <div className="control">
                    <label htmlFor="email">E-mail Address</label>
                    <input type="email" name="email" id="email"/>
                </div>


                <div className="control">   
                    <label htmlFor="address">Street</label>
                    <input type="text" name="address" id="address"/>
                </div>


                <div className="control-row">
                    <div className="control">
                        <label htmlFor="postal-code">Postal Code</label>
                        <input type="text" name="postal-code" id="postal-code"/>
                    </div>


                    <div className="control">
                        <label htmlFor="city">City</label>
                        <input type="text" name="city" id="city"/>
                    </div>

                </div>
   

                <div className="modal-actions">
                    <button className="text-button">Close</button>
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
        </dialog>
    )
});

export default Checkout;