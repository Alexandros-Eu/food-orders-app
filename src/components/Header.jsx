import { useContext } from 'react';
import { AppContext } from '../state/AppContext.jsx';

/**
 * Header.jsx
 * Displays the app's logo, title, and a cart button showing the current cart item count.
 * Uses AppContext to access cart item count state and handle cart modal visibility.
 */
export default function Header({onCart})
{
    // utilizes a cart state counter to keep track of the quantity of products and a function to handle the modal
    const { cartCounter }  = useContext(AppContext) 
    return (
        <header id="main-header">
            <div id="title">
                <img src="/logo.jpg" alt="Food Order App Logo" />
                <h1>React Food</h1>
            </div>
            <button className="text-button" onClick={onCart}>Cart ({cartCounter})</button>
        </header>
    )
}