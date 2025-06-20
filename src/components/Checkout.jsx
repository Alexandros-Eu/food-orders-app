export default function Checkout()
{
    const errors = [];

    async function onCheckoutAction(formData)
    {
        const name = formData.get("name");
        const email = formData.get("email");
        const address = formData.get("address");
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

        if(!address.trim())
        {
            errors.push("You must provide an address for your order");
        }

        if(!postalCode.trim())
        {
            errors.push("You must provide a postal code for your order");
        }

        if(!city.trim())
        {
            errors.push("A city is required for the order");
        }



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