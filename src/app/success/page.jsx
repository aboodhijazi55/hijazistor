"use client"

import React, { useEffect } from 'react'
import Link from 'next/link';
import "./page.css"
import { useCart } from '@/context/CartProvider';


export default function success() {
    const { clearCart } = useCart();
    useEffect(() => {
        localStorage.clear();
        clearCart()
    }, []);
    return (
        <div className="success-wrapper">
            <div className="success">
                {/* <p className="icon">
                    <BsBagCheckFill />
                </p> */}
                <h2>Thank you for your order!</h2>
                <p className="email-msg">Check your email inbox for the receipt.</p>
                <p className="description">
                    If you have any questions, please email
                    <a className="email" href="mailto:order@example.com">
                        order@example.com
                    </a>
                </p>
                <Link href="/">
                    <button type="button" width="300px" className="btn">
                        Continue Shopping
                    </button>
                </Link>
            </div>
        </div>
    );
}
