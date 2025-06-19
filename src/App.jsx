import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Header from './components/Header.jsx';
import Cart from './components/Cart.jsx';
import Meals from './components/Meals.jsx';
import Checkout from './components/Checkout.jsx';

function App() {

  const [cartCounter, setCartCounter] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const cartModal = useRef(null);

  function handleAddMeal(name, price)
  {
    setCartCounter(oldCounter => oldCounter + 1);
    setCartItems(oldCartItems => {

      const doesExist = oldCartItems.find((item) => {
        if(item.name === name)
        {
          return true;
        }

        return false;
      })

      if(!doesExist)
      {
        return [...oldCartItems,
          {
            id: uuidv4(),
            name: name,
            price: price,
            quantity: 1
          }
        ]
      }
      else
      {
          return oldCartItems.map((item) => {
            if(item.name === name)
            {
              return {
                ...item,
                quantity: item.quantity + 1
              }
            }

            return {
              ...item
            }
          })
      }

    })
  }

  function handleCartClick()
  {
    cartModal.current.open();
  }

  function handleCartClose()
  {
    cartModal.current.close();
  }

  return (
    <>
      <Header cartCounter={cartCounter} onCart={handleCartClick}/>
      <Checkout/>
      <Cart items={cartItems} ref={cartModal} onCartClose={handleCartClose}/>
      <Meals onAdd={handleAddMeal}/>
    </>
  );
}

export default App;
