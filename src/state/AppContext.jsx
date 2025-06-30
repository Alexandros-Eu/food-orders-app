import { useState, useRef, createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

/**
 * Provides global state and modal management for the food orders app.
 * Exposes cart state, modal refs, and handler functions to all child components.
 */


export const AppContext = createContext();

export default function AppProvider({children})
{
  const [cartCounter, setCartCounter] = useState(0); // Counter that keeps track the number of items in the cart
  const [cartItems, setCartItems] = useState([]); // State that manages the items of the cart
  const cartModal = useRef(null); // The Cart modal ref
  const checkoutModal = useRef(null); // The Checkout modal ref
  const successModal = useRef(null); // The Success modal ref

  // A fn that handles the addition of a meal to the cart from the front page
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

  // A fn that handles the removal of an item from the cart (quantity -1 or the item if it's only one)
  function handleItemRemoval(id)
  {
    setCartItems(oldCartItems => {
      const itemForRemoval = oldCartItems.find((item) => {
        if(item.id === id && item.quantity === 1)
        {
          return true;
        }

        return false;
      })

      if(itemForRemoval)
      {
        return oldCartItems.filter((item) => item.id !== id)
      }

      return oldCartItems.map((item) => {
        if(item.id === id && item.quantity > 1) {
          return {
            ...item,
            quantity: item.quantity - 1
          }
        }

        return {
          ...item
        }
      })
    })

    setCartCounter(oldCounter => oldCounter - 1);
  }

  // A fn that handles the addition of an item that is already in the cart
  function handleItemAddition(id)
  {
    setCartItems(oldCartItems => {
      return oldCartItems.map(item => {
        if(item.id === id)
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
    })

    setCartCounter(oldCounter => oldCounter + 1);
  }

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

  // The state and fn(s) that are being made available throughout the app
  const contextValue = {
    cartCounter,
    setCartCounter,
    cartItems,
    setCartItems,
    cartModal,
    checkoutModal,
    successModal,
    handleAddMeal,
    handleItemRemoval,
    handleItemAddition,
    handleCartClick,
    handleModalClose,
    handleCartConfirm
  }



  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )

}
