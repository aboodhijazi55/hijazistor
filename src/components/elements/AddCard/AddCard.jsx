"use client"
import React, { useState } from 'react'
import { useCart } from "@/context/CartProvider";
import "./button.css"
import '@fortawesome/fontawesome-free/css/all.min.css';
export default function AddCard({ product }) {
    const { updateCart } = useCart();
    const [clicked, setClicked] = useState(false);

    const onAddToCartClick = () => {
        setClicked(true);
        setTimeout(() => setClicked(false), 4000)
        updateCart(product, 1);
    };


    return (
        <>

            <button
                className={`cart-button ${clicked ? 'clicked' : ''}`}
                onClick={onAddToCartClick}
            >
                <span className="add-to-cart">Add to cart</span>
                <span className="added">Added to your cart</span>
                <i className="fas fa-shopping-cart"></i>
                <i className="fas fa-box"></i>
            </button>
        </>)
}
