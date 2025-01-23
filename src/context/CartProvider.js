
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
    console.log("from cartprovider", children);

    const [cartItems, setCartItems] = useState(["abood"]);

    // const removeFromCart = (product) => {
    //     const newProducts = cartItems.filter(
    //         (item) => item.product.id !== product.id
    //     );
    //     setCartItems(newProducts);
    //     updateCartInLS(newProducts);
    // };

    // const clearCart = () => {
    //     setCartItems([]);
    //     updateCartInLS([]);
    // };

    const updateCart = (product, qty) => {
        // console.log("from updatCart", product)
        // console.log("from updatCart", cartItems)
        const finalCartItems = [...cartItems];
        const index = cartItems.findIndex((item) => product.id === item.product.id);




        if (index === -1) {
            finalCartItems.push({ count: qty, product });

        } else {
            finalCartItems[index].count += qty;
        }


        if (finalCartItems[index]?.count === 0) {
            removeFromCart(product);
        } else {
            setCartItems(finalCartItems);
            updateCartInLS(finalCartItems);
        }
    };

    // const countAllItems = () => {
    //     return cartItems.reduce((total, cartItem) => total + cartItem.count, 0);
    // };

    // const countTotalPrice = () => {
    //     return cartItems
    //         .reduce(
    //             (total, cartItem) =>
    //                 total + cartItem.product.price * cartItem.count,
    //             0
    //         )
    //         .toFixed(2);
    // };

    // useEffect(() => {
    //     const result = localStorage.getItem("cartItems");
    //     if (result !== null) {
    //         setCartItems(JSON.parse(result));
    //     }
    // }, []);

    return (
        <CartContext.Provider
            value={{
                items: cartItems,
                updateCart,
                // removeFromCart,
                // countTotalPrice,
                // countAllItems,
                // clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);

