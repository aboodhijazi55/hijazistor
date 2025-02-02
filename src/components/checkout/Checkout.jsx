// "use client"
// import { useCart } from '@/context/CartProvider'
// import React, { useEffect, useState } from 'react'
// import styles from "./page.module.css"
// import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
// import convertToSubcurrency from "@/app/lib/convertToSubcurrency";
// import { useRouter } from "next/navigation";


// export default function Checkout() {
//     const router = useRouter();
//     const stripe = useStripe();
//     const elements = useElements();
//     const { countTotalPrice } = useCart()
//     const amount = countTotalPrice() || "0";

//     const [errorMessage, setErrorMessage] = useState()
//     const [clientSecret, setClientSecret] = useState("")
//     const [loading, setLoading] = useState(false)

//     useEffect(() => {
//         fetch("/api/create-payment-intent", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
//         })
//             .then((res) => res.json())
//             .then((data) => setClientSecret(data.clientSecret));
//     }, [amount])



//     const { items: cartItems, removeFromCart, updateCart, clearCart } = useCart()
//     useEffect(() => {
//         const result = localStorage.getItem("cartItems")
//         if (result !== null) {
//             console.log(JSON.parse(result));

//         }
//     }, [])


//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setLoading(true);

//         if (!stripe || !elements) {
//             return null;
//         }

//         const { error: submitError } = await elements.submit();

//         if (submitError) {
//             setErrorMessage(submitError.message);
//             setLoading(false);
//             return;
//         }

//         const { error } = await stripe.confirmPayment({
//             elements,
//             clientSecret,
//             confirmParams: {
//                 return_url: `http://www.localhost:3000/success`,
//             },
//         });

//         if (error) {
//             // This point is only reached if there's an immediate error when
//             // confirming the payment. Show the error to your customer (for example, payment details incomplete)
//             setErrorMessage(error.message);
//         } else {
//             // The payment UI automatically closes with a success animation.
//             // Your customer is redirected to your `return_url`.
//         }

//         setLoading(false);
//     };
//     if (!clientSecret || !stripe || !elements) {
//         return (
//             <div className="flex items-center justify-center">
//                 <div
//                     className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
//                     role="status"
//                 >
//                     <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
//                         Loading...
//                     </span>
//                 </div>
//             </div>
//         );
//     }
//     return (<>
//         <div className={styles.container}>
//             <div className={styles.items}>
//                 {cartItems.map((cartItem) => {

//                     return (
//                         <div key={cartItem.product.id} className="p-4">
//                             <div className="flex space-x-4 ">
//                                 <div className={styles.imageContaner}>

//                                     <img
//                                         src={cartItem.product.image}
//                                         alt="" />
//                                 </div>
//                                 <div className="flex-1">
//                                     <h3 className="font-semibold">{cartItem.product.title.slice(0, 20) + "..."}</h3>
//                                     <div className="flex text-gray-400 text-sm space-x-1">
//                                         <span>{cartItem.count}</span>
//                                         <span>x</span>
//                                         <span>{cartItem.count * cartItem.product.price}</span>
//                                     </div>
//                                 </div>

//                                 <div className="ml-auto">
//                                     <button
//                                         onClick={() => removeFromCart(cartItem.product)}
//                                         className="text-xs uppercase hover:underline cursor-pointer"
//                                     >
//                                         Remove
//                                     </button>

//                                     <div className="flex items-center justify-between">
//                                         <button className="cursor-pointer" onClick={() => updateCart(cartItem.product, -1)}>
//                                             -
//                                         </button>
//                                         <span className="text-xs">{cartItem.count}</span>
//                                         <button className="cursor-pointer" onClick={() => updateCart(cartItem.product, 1)}>
//                                             +
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//             <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
//                 {clientSecret && <PaymentElement />}
//                 <button disabled={!stripe || loading}
//                     className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse">
//                     {!loading ? `Pay $${amount}` : "Processing..."}
//                 </button>
//             </form>
//         </div>
//     </>)
// }
"use client";
import { useCart } from '@/context/CartProvider';
import React, { useEffect, useState } from 'react';
import styles from "./page.module.css";
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import convertToSubcurrency from "@/app/lib/convertToSubcurrency";
import { useRouter } from "next/navigation";

export default function Checkout() {
    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();
    const { countTotalPrice, items: cartItems, removeFromCart, updateCart, clearCart } = useCart();

    const amount = countTotalPrice();

    const [errorMessage, setErrorMessage] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    // Redirect if cart is empty
    useEffect(() => {
        if (cartItems.length === 0) {
            router.push("/products"); // Redirect to home page or another page
        }
    }, [cartItems.length, router]);

    // Fetch client secret when amount changes
    useEffect(() => {
        if (amount > 0) {
            fetch("/api/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
            })
                .then((res) => res.json())
                .then((data) => setClientSecret(data.clientSecret));
        }
    }, [amount]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            return;
        }

        const { error: submitError } = await elements.submit();

        if (submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
            },
        });

        if (error) {
            setErrorMessage(error.message);
        }

        setLoading(false);
    };

    if (!clientSecret || !stripe || !elements) {
        return (
            <div className="flex items-center justify-center">
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.items}>
                {cartItems.map((cartItem) => (
                    <div key={cartItem.product.id} className="p-4">
                        <div className="flex space-x-4">
                            <div className={styles.imageContaner}>
                                <img src={cartItem.product.image} alt="" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold">
                                    {cartItem.product.title.slice(0, 20) + "..."}
                                </h3>
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
                ))}
            </div>
            <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
                {clientSecret && <PaymentElement />}
                <button
                    disabled={!stripe || loading}
                    className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
                >
                    {!loading ? `Pay $${amount}` : "Processing..."}
                </button>
            </form>
        </div>
    );
}
