export default function Checkout()
{
    const errors = [];

    async function onCheckoutAction(formData)
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

        const req = await fetch("http://localhost:3000/orders", {
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

    return (
        <dialog className="modal" open>
            <form action="">
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
                    <button formAction={onCheckoutAction} className="button">Submit Order</button>
                </div>
            </form>
        </dialog>
    )
}