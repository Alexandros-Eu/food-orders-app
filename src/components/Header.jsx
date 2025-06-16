import logo from '../../public/logo.jpg';

export default function Header({cartCounter})
{
    return (
        <header id="main-header">
            <div id="title">
                <img src={logo} alt="Food Order App Logo" />
                <h1>React Food</h1>
            </div>
            <button className="text-button">Cart ({cartCounter})</button>
        </header>
    )
}