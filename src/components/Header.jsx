

export default function Header({cartCounter, onCart})
{
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