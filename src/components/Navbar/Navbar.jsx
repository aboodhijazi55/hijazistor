"use client"
import { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css"
import { links } from "./data";
import Button from "../elements/Button/Button";
import Logo from "../elements/Logo/Logo";
import DarkMode from "../DarkMode/DarkMode";
import SideCart from "@/app/(dynamic)/cart/SideCart";

const CartIcon = ({ size, color }) => {
    return (
        <svg
            width={size || 20}
            height={size || 20}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M0 0.75C0 0.551088 0.0790175 0.360322 0.21967 0.21967C0.360322 0.0790175 0.551088 0 0.75 0H1.308C2.258 0 2.828 0.639 3.153 1.233C3.37 1.629 3.527 2.088 3.65 2.504C3.68327 2.50137 3.71663 2.50004 3.75 2.5H16.248C17.078 2.5 17.678 3.294 17.45 4.093L15.622 10.502C15.4581 11.0769 15.1114 11.5827 14.6343 11.9428C14.1572 12.303 13.5758 12.4979 12.978 12.498H7.03C6.42749 12.498 5.84165 12.3002 5.36252 11.9349C4.8834 11.5696 4.5375 11.057 4.378 10.476L3.618 7.704L2.358 3.456L2.357 3.448C2.201 2.881 2.055 2.35 1.837 1.954C1.628 1.569 1.46 1.5 1.309 1.5H0.75C0.551088 1.5 0.360322 1.42098 0.21967 1.28033C0.0790175 1.13968 0 0.948912 0 0.75ZM6.5 17.5C7.03043 17.5 7.53914 17.2893 7.91421 16.9142C8.28929 16.5391 8.5 16.0304 8.5 15.5C8.5 14.9696 8.28929 14.4609 7.91421 14.0858C7.53914 13.7107 7.03043 13.5 6.5 13.5C5.96957 13.5 5.46086 13.7107 5.08579 14.0858C4.71071 14.4609 4.5 14.9696 4.5 15.5C4.5 16.0304 4.71071 16.5391 5.08579 16.9142C5.46086 17.2893 5.96957 17.5 6.5 17.5ZM13.5 17.5C14.0304 17.5 14.5391 17.2893 14.9142 16.9142C15.2893 16.5391 15.5 16.0304 15.5 15.5C15.5 14.9696 15.2893 14.4609 14.9142 14.0858C14.5391 13.7107 14.0304 13.5 13.5 13.5C12.9696 13.5 12.4609 13.7107 12.0858 14.0858C11.7107 14.4609 11.5 14.9696 11.5 15.5C11.5 16.0304 11.7107 16.5391 12.0858 16.9142C12.4609 17.2893 12.9696 17.5 13.5 17.5Z"
                fill={color || "#000"}
            />
        </svg>
    );
};

export default function Navbar() {
    const [showSideCart, setShowSideCart] = useState(false);
    return (
        <>
            <div className={styles.contener}>
                <Logo />
                <div className={styles.links}>
                    <DarkMode />
                    {links.map(link => {
                        return <Link key={link.id} href={link.url} className={styles.link}>{link.title}</Link>
                    })}

                    <button
                        onClick={() => setShowSideCart((old) => !old)}
                        className="bg-gray-200 p-3 w-9 h-9 flex justify-center items-center rounded-full relative">
                        <CartIcon color="#111" size={20} />
                        {/* {cartItems > 0 ? (
                    <div className="font-semibold absolute text-white bg-orange-600 text-xs w-6 h-6 rounded-full flex items-center justify-center -top-2 -right-2 bg-opacity-70">
                        <p>{cartItems >= 9 ? "9+" : cartItems}</p>
                    </div>
                    ) : null} */}
                    </button>

                    <Button />

                </div>
            </div >
            <SideCart visible={showSideCart} onRequestClose={() => setShowSideCart(false)} />

        </>
    )
}
