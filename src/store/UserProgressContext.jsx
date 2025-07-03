import { useState, createContext } from 'react';

const UserProgressContext = createContext({
    userProgress: '',
    showCart: () => {},
    hideCart: () => {},
    showCheckout: () => {},
    hideCheckout: () => {}
});

export function UserProgressProvider({children})
{
    const [userProgress, setUserProgress] = useState('');

    function showCart()
    {
        setUserProgress('cart');
    }

    function hideCart()
    {
        setUserProgress('');
    }

    function showCheckout()
    {
        setUserProgress('checkout');
    }

    function hideCheckout()
    {
        setUserProgress('');
    }

    const UserProgressCtx = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }

    return (
        <UserProgressContext.Provider value={UserProgressCtx}>
            {children}
        </UserProgressContext.Provider>
    )
}

export default UserProgressContext;