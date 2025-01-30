
"use client"
import { useCart } from "@/context/CartProvider";
import styles from "./page.module.css"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const SideCart = ({ visible, onRequestClose }) => {

    const {
        items: cartItems,
        updateCart,
        removeFromCart,
        countTotalPrice,
        clearCart,
    } = useCart();
    const router = useRouter();
    const { status } = useSession()
    const isLoggedIn = status === "authenticated"

    return (<>
        <div
            style={{ right: visible ? "0" : "-100%", padding: "15px" }}
            className="shadow-md transition-all w-96 bg-white min-h-screen fixed right-0 top-0 flex flex-col z-50 p-5"
        >
            <div className="p-4 flex justify-between">
                <h1 className="font-semibold uppercase text-gray-600">Cart</h1>

                <button
                    onClick={onRequestClose}
                    className="outline-none block  uppercase cursor-pointer font-bold mr-15"
                >
                    X
                </button>
            </div>
            <div className="w-full h-0.5 bg-gray-200" />

            {cartItems.map((cartItem) => {

                return (
                    <div key={cartItem.product.id} className="p-4">
                        <div className="flex space-x-4 ">
                            <div className={styles.imageContaner}>

                                <img
                                    src={cartItem.product.image}
                                    alt="" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold">{cartItem.product.title.slice(0, 20) + "..."}</h3>
                                <div className="flex text-gray-400 text-sm space-x-1">
                                    <span>{cartItem.count}</span>
                                    <span>x</span>
                                    <span>{cartItem.count * cartItem.product.price}</span>
                                </div>
                            </div>

                            <div className="ml-auto">
                                <button
                                    onClick={() => removeFromCart(cartItem.product)}
                                    className="text-xs uppercase hover:underline cursor-pointer"
                                >
                                    Remove
                                </button>

                                <div className="flex items-center justify-between">
                                    <button className="cursor-pointer" onClick={() => updateCart(cartItem.product, -1)}>
                                        -
                                    </button>
                                    <span className="text-xs">{cartItem.count}</span>
                                    <button className="cursor-pointer" onClick={() => updateCart(cartItem.product, 1)}>
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            <div className="w-full h-0.5 bg-gray-200" />
            <div className={styles.lastContainer}>
                <div className="mt-auto p-4">
                    <div className="py-4">
                        <h1 className="font-semibold text-xl uppercase">Total</h1>
                        <p className="font-semibold">
                            <span className="text-gray-400 font-normal">
                                The total of your cart is:
                            </span>{" "}
                            ${countTotalPrice()}
                        </p>
                    </div>

                    {countTotalPrice() > 0 && (
                        <button
                            onClick={() => {
                                if (isLoggedIn) {
                                    console.log("send data to the server and create payment link");
                                    router.push(`/checkout?amount=${countTotalPrice()}`);
                                } else {
                                    router.push("/login");
                                }
                                onRequestClose && onRequestClose();
                            }}
                            className="border-2 border-orange-600 py-2 w-full rounded text-orange-600 uppercase cursor-pointer"
                        >
                            Checkout
                        </button>
                    )}
                    <button onClick={clearCart} className="uppercase mt-4 text-center w-full text-sm cursor-pointer">
                        Clear The Cart
                    </button>
                </div>
            </div>
        </div>

    </>);
};

export default SideCart;
