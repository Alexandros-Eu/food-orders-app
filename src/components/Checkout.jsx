export default function Checkout()
{
    return (
        <dialog class="modal" open>
            <form action="">
                <h2>Checkout</h2>
                <p>Total amount:</p>

                <div class="control">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" name="name" id="name"/>
                </div>


                <div class="control">
                    <label htmlFor="email">E-mail Address</label>
                    <input type="email" name="email" id="email"/>
                </div>


                <div class="control">   
                    <label htmlFor="address">Street</label>
                    <input type="text" name="address" id="address"/>
                </div>


                <div class="control-row">
                    <div class="control">
                        <label htmlFor="postal-code">Postal Code</label>
                        <input type="text" name="postal-code" id="postal-code"/>
                    </div>


                    <div class="control">
                        <label htmlFor="city">City</label>
                        <input type="text" name="city" id="city"/>
                    </div>

                </div>
   

                <div class="modal-actions">
                    <button class="text-button">Close</button>
                    <button class="button">Submit Order</button>
                </div>
            </form>
        </dialog>
    )
}