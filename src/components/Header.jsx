import { useContext } from 'react';
import AppProvider from '../state/AppContext.jsx';

export default function Header()
{
    const { cartCounter, handleCartClick: onCart }  = useContext(AppProvider)

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