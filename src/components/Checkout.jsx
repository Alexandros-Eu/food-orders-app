export default function Checkout()
{
    return (
        <dialog open>
            <form action="">
                <h2>Checkout</h2>
                <p>Total amount:</p>

                <label htmlFor="">Full Name</label>
                <input type="text" />

                <label htmlFor="">E-mail Address</label>
                <input type="email" />

                <label htmlFor="">Street</label>
                <input type="text" />

                <label htmlFor="">Postal Code</label>
                <input type="text" />

                <div>
                    <label htmlFor="">City</label>
                    <input type="text" />
                </div>

                <div>
                    <button>Close</button>
                    <button>Submit Order</button>
                </div>
            </form>
        </dialog>
    )
}