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

  function clearCart()
  {
    setCartCounter(0);
    setCartItems([]);
  }

  // The state and fn(s) that are being made available throughout the app
  const contextValue = {
    cartCounter,
    cartItems,
    handleAddMeal,
    handleItemRemoval,
    handleItemAddition,
    clearCart
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )

}
