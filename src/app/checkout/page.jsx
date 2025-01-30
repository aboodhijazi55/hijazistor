'use client'
import Checkout from '@/components/checkout/Checkout'
import convertToSubcurrency from "@/app/lib/convertToSubcurrency"
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useSearchParams } from 'next/navigation'
if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined")
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)


export default function checkout() {
    const searchParams = useSearchParams();
    const amount = searchParams.get("amount");
    // const amount = 49.99;
    return (
        <>

            <Elements
                stripe={stripePromise}
                options={{
                    mode: "payment",
                    currency: "usd",
                    amount: convertToSubcurrency(amount)
                }}
            >
                <Checkout amount={amount} />
            </Elements>
        </>

    )
}
