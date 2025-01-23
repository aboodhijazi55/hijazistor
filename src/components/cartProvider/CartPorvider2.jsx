"use client"

import CartProvider from "@/context/CartProvider"

export default function Porvider({ children }) {
    return (
        <CartProvider>{children}</CartProvider>
    )
}
