
"use client"
import { createContext, useContext, useEffect, useState, } from "react";

const updateCartInLS = (products) => {
    localStorage.setItem("cartItems", JSON.stringify(products));
};

const CartContext = createContext({
    items: [],
    updateCart: () => { },
    removeFromCart: () => { },
    clearCart: () => { },
    countAllItems: () => 0,
    countTotalPrice: () => "0",
});

const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);

    const removeFromCart = (product) => {
        const newProducts = cartItems.filter(
            (item) => item.product.id !== product.id
        );
        setCartItems(newProducts);
        updateCartInLS(newProducts);
    };

    const clearCart = () => {
        setCartItems([]);
        updateCartInLS([]);
    };


    const updateCart = (product, qty) => {
        if (!product || typeof qty !== "number" || qty === 0) return; // Early exit for invalid inputs

        const updatedCartItems = [...cartItems];
        const index = updatedCartItems.findIndex((item) => item.product.id === product.id);

        if (index === -1) {
            updatedCartItems.push({ count: qty, product });
        } else {
            updatedCartItems[index].count += qty;
            if (updatedCartItems[index].count <= 0) {
                updatedCartItems.splice(index, 1);
            }
        }
        setCartItems(updatedCartItems);
        updateCartInLS(updatedCartItems);
    };


    const countAllItems = () => {
        return cartItems.reduce((total, cartItem) => total + cartItem.count, 0);
    };

    const countTotalPrice = () => {
        return cartItems
            .reduce(
                (total, cartItem) =>
                    total + cartItem.product.price * cartItem.count,
                0
            )
            .toFixed(2);
    };

    useEffect(() => {
        const result = localStorage.getItem("cartItems");
        if (result !== null) {
            setCartItems(JSON.parse(result));
        }
    }, []);

    return (
        <CartContext.Provider
            value={{
                items: cartItems,
                updateCart,
                removeFromCart,
                countTotalPrice,
                countAllItems,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);

