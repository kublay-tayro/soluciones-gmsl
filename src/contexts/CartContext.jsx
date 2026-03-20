import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (product) => {
        setCart([...cart, product]);
        setIsCartOpen(true);
    };

    const removeFromCart = (indexToRemove) => {
        setCart(cart.filter((_, index) => index !== indexToRemove));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, isCartOpen, setIsCartOpen }}>
            {children}
        </CartContext.Provider>
    );
};
