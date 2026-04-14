"use client";
import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [toast, setToast] = useState({ visible: false, productName: '' });
    const toastTimer = useRef(null);

    const addToCart = useCallback((product) => {
        setCart(prev => [...prev, product]);
        
        // Show toast instead of opening drawer
        if (toastTimer.current) clearTimeout(toastTimer.current);
        setToast({ visible: true, productName: product.name });
        toastTimer.current = setTimeout(() => {
            setToast({ visible: false, productName: '' });
        }, 3000);
    }, []);

    const removeFromCart = useCallback((indexToRemove) => {
        setCart(prev => prev.filter((_, index) => index !== indexToRemove));
    }, []);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, isCartOpen, setIsCartOpen, toast }}>
            {children}
        </CartContext.Provider>
    );
};
