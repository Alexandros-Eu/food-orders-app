import { useState, useRef } from 'react';


import Header from './components/Header.jsx';
import Cart from './components/Cart.jsx';
import Meals from './components/Meals.jsx';
import Checkout from './components/Checkout.jsx';
import Success from './components/Success.jsx';

function App() {

  // const [cartCounter, setCartCounter] = useState(0);
  // const [cartItems, setCartItems] = useState([]);
  // const cartModal = useRef(null);
  // const checkoutModal = useRef(null);
  // const successModal = useRef(null);

  // function handleAddMeal(name, price)
  // {
  //   setCartCounter(oldCounter => oldCounter + 1);
  //   setCartItems(oldCartItems => {

  //     const doesExist = oldCartItems.find((item) => {
  //       if(item.name === name)
  //       {
  //         return true;
  //       }

  //       return false;
  //     })

  //     if(!doesExist)
  //     {
  //       return [...oldCartItems,
  //         {
  //           id: uuidv4(),
  //           name: name,
  //           price: price,
  //           quantity: 1
  //         }
  //       ]
  //     }
  //     else
  //     {
  //         return oldCartItems.map((item) => {
  //           if(item.name === name)
  //           {
  //             return {
  //               ...item,
  //               quantity: item.quantity + 1
  //             }
  //           }

  //           return {
  //             ...item
  //           }
  //         })
  //     }

  //   })
  // }

  // function handleItemRemoval(id)
  // {
  //   setCartItems(oldCartItems => {
  //     const itemForRemoval = oldCartItems.find((item) => {
  //       if(item.id === id && item.quantity === 1)
  //       {
  //         return true;
  //       }

  //       return false;
  //     })

  //     if(itemForRemoval)
  //     {
  //       return oldCartItems.filter((item) => item.id !== id)
  //     }

  //     return oldCartItems.map((item) => {
  //       if(item.id === id && item.quantity > 1) {
  //         return {
  //           ...item,
  //           quantity: item.quantity - 1
  //         }
  //       }

  //       return {
  //         ...item
  //       }
  //     })
  //   })

  //   setCartCounter(oldCounter => oldCounter - 1);
  // }

  // function handleItemAddition(id)
  // {
  //   setCartItems(oldCartItems => {
  //     return oldCartItems.map(item => {
  //       if(item.id === id)
  //       {
  //         return {
  //           ...item,
  //           quantity: item.quantity + 1
  //         }
  //       }

  //       return {
  //         ...item
  //       }
  //     })
  //   })


  //   setCartCounter(oldCounter => oldCounter + 1);
  // }

  // function handleCartClick()
  // {
  //   cartModal.current.open();
  // }

  // function handleModalClose(id)
  // {
  //   switch(id)
  //   {
  //     case "close-cart":
  //       cartModal.current.close();
  //       break;
  //     case "close-checkout":
  //       checkoutModal.current.close();
  //       break;
  //     case "close-success":
  //       checkoutModal.current.close();
  //       successModal.current.open();
  //   }
  // }

  // function handleCartConfirm()
  // {
  //   cartModal.current.close();
  //   checkoutModal.current.open();
  // }

  return (
    <>
      <AppContext>
        <Header cartCounter={cartCounter} onCart={handleCartClick}/>
        <Cart items={cartItems} onCartClose={handleModalClose} onCartConfirm={handleCartConfirm} onItemRemove={handleItemRemoval} onItemAdd={handleItemAddition} ref={cartModal}/>
        <Checkout items={cartItems} onCheckoutClose={handleModalClose} ref={checkoutModal}/>
        <Success ref={successModal}/>
        <Meals/>
      </AppContext>
    </>
  );
}

export default App;
