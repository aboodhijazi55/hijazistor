"use client"
import React from 'react'
import styles from "../../../app/(dynamic)/products/page.module.css"
import { useCart } from "@/context/CartProvider";


export default function AddCard({ product }) {
    const { updateCart } = useCart();

    const onAddToCartClick = () => {
        console.log("from addCart", product);

        updateCart(product, 1);
    };


    return (
        <button
            className={styles.addCardButton}
            onClick={onAddToCartClick}
        >Add to cart</button>
    )
}
