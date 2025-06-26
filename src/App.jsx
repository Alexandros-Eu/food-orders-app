import AppProvider from './state/AppContext.jsx';

import Header from './components/Header.jsx';
import Cart from './components/Cart.jsx';
import Meals from './components/Meals.jsx';
import Checkout from './components/Checkout.jsx';
import Success from './components/Success.jsx';

function App() {
  return (
    <>
      <AppProvider>
        <Header/>
        <Cart/>
        <Checkout/>
        <Success/>
        <Meals/>
      </AppProvider>
    </>
  );
}

export default App;
