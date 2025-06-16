import { useState } from 'react';

import Header from './components/Header.jsx';
import Cart from './components/Cart.jsx';
import Meals from './components/Meals.jsx';

function App() {

  const [cartCounter, setCartCounter] = useState(0);

  function handleAddMeal()
  {
    setCartCounter(oldCounter => oldCounter + 1);
  }

  return (
    <>
      <Header cartCounter={cartCounter}/>
      <Cart/>
      <Meals onAdd={handleAddMeal}/>
    </>
  );
}

export default App;
