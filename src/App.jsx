import { useRef } from 'react';
import AppProvider from './state/AppContext.jsx';

import Header from './components/Header.jsx';
import Cart from './components/Cart.jsx';
import Meals from './components/Meals.jsx';
import Checkout from './components/Checkout.jsx';
import Success from './components/Success.jsx';

/**
 * App.jsx
 * Root component of the Food Orders App.
 * Wraps the application in AppProvider for global state management.
 * Renders the main UI components: Header, Cart, Checkout, Success, and Meals.
 * Handles the fn(s) that handle the modals of the app
*/

function App() {
  const cartModal = useRef(null);
  const checkoutModal = useRef(null);
  const successModal = useRef(null);

  // A fn that handles when the 'close' button is pressed on the modals
  function handleModalClose(id)
  {
    switch(id)
    {
      case "close-cart":
        cartModal.current.close();
        break;
      case "close-checkout":
        checkoutModal.current.close();
        break;
      case "open-success":
        checkoutModal.current.close();
        successModal.current.open();
        break;
      case "close-success":
        successModal.current.close();
    }
  }

  // A fn that handles the cart button being pressed
  function handleCartClick()
  {
    cartModal.current.open();
  }

  // A fn that proceeds to the checkout
  function handleCartConfirm()
  {
    cartModal.current.close();
    checkoutModal.current.open();
  }

  return (
    <>
      <AppProvider>
        <Header onCart={handleCartClick}/>
        <Cart onCartClose={handleModalClose} onCartConfirm={handleCartConfirm} ref={cartModal}/>
        <Checkout onCheckoutClose={handleModalClose} ref={checkoutModal}/>
        <Success onSuccessClose={handleModalClose} ref={successModal}/>
        <Meals/>
      </AppProvider>
    </>
  );
}

export default App;
