import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";


interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface cartContextType {
    cartItems: CartItem[];
    addToCart: (product: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;    
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<cartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (product: Omit<CartItem, 'quantity'>) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);

            if (existing) {
                return prev.map(item => 
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, {...product, quantity: 1}];
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price*item.quantity, 0);

    return (
        <CartContext.Provider value={{ 
            cartItems, 
            addToCart,
            removeFromCart,
            clearCart,
            totalItems, 
            totalPrice 
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
};