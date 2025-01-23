// "use client"
// import { useCart } from "@/context/CartProvider";


// const SideCart = ({ visible, onRequestClose }) => {
//     const { addToCart, removeFromCart } = useCart()
//     console.log(addToCart);

//     return (
//         <div
//             style={{ right: visible ? "0" : "-100%" }}
//             className="shadow-md transition-all w-96 bg-white min-h-screen fixed  right-0 top-0 flex flex-col z-50"
//         >
//             <div className="p-4 flex justify-between">
//                 <h1 className="font-semibold uppercase text-gray-600">Cart</h1>
//                 <button className="uppercase text-sm">Clear</button>
//             </div>
//             <div className="w-full h-0.5 bg-gray-200" />

//             <div className="p-4">
//                 <div className="flex space-x-4">
//                     <img
//                         src="https://images.unsplash.com/photo-1604671748253-e683240e7efa?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                         alt=""
//                         className="w-16 aspect-square rounded object-cover"
//                     />
//                     <div className="flex-1">
//                         <h2 className="font-semibold">Smartphone Case</h2>
//                         <div className="flex text-gray-400 text-sm space-x-1">
//                             <span>1</span>
//                             <span>x</span>
//                             <span>100</span>
//                         </div>
//                     </div>

//                     <div className="ml-auto">
//                         <button className="text-xs uppercase hover:underline">
//                             Remove
//                         </button>

//                         <div className="flex items-center justify-between">
//                             <button>-</button>
//                             <span className="text-xs">1</span>
//                             <button>+</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="w-full h-0.5 bg-gray-200" />

//             <div className="mt-auto p-4">
//                 <div className="py-4">
//                     <h1 className="font-semibold text-xl uppercase">Total</h1>
//                     <p className="font-semibold">
//                         <span className="text-gray-400 font-normal">
//                             The total of your cart is:
//                         </span>{" "}
//                         ${100}
//                     </p>
//                 </div>

//                 <button className="border-2 border-orange-600 py-2 w-full rounded text-orange-600 uppercase">
//                     Checkout
//                 </button>
//                 <button
//                     onClick={onRequestClose}
//                     className="outline-none block mt-4 text-center w-full uppercase"
//                 >
//                     Close
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default SideCart;
"use client"
import { useCart } from "@/context/CartProvider";

import Image from "next/image";
import { useRouter } from "next/navigation";

const SideCart = ({ visible, onRequestClose }) => {
    const {
        items: cartItems,
        updateCart,
        removeFromCart,
        countTotalPrice,
        clearCart,
    } = useCart();
    const router = useRouter();

    console.log(cartItems);


    return (<></>
        // <div
        //     style={{ right: visible ? "0" : "-100%" }}
        //     className="shadow-md transition-all w-96 bg-white min-h-screen fixed right-0 top-0 flex flex-col z-50"
        // >
        //     <div className="p-4 flex justify-between">
        //         <h1 className="font-semibold uppercase text-gray-600">Cart</h1>
        //         <button onClick={clearCart} className="uppercase text-sm">
        //             Clear
        //         </button>
        //     </div>
        //     <div className="w-full h-0.5 bg-gray-200" />

        //     {cartItems.map((cartItem) => {
        //         // if (!cartItem.product) return null
        //         return (
        //             <div key={cartItem.product.id} className="p-4">
        //                 <div className="flex space-x-4">
        //                     <Image
        //                         src={cartItem.product.image}
        //                         alt={cartItem.product.title}
        //                         className="rounded object-cover"
        //                         width={64}
        //                         height={64}
        //                     />
        //                     <div className="flex-1">
        //                         <h2 className="font-semibold">Smartphone Case</h2>
        //                         <div className="flex text-gray-400 text-sm space-x-1">
        //                             <span>{cartItem.count}</span>
        //                             <span>x</span>
        //                             <span>{cartItem.count * cartItem.product.salePrice}</span>
        //                         </div>
        //                     </div>

        //                     <div className="ml-auto">
        //                         <button
        //                             onClick={() => removeFromCart(cartItem.product)}
        //                             className="text-xs uppercase hover:underline"
        //                         >
        //                             Remove
        //                         </button>

        //                         <div className="flex items-center justify-between">
        //                             <button onClick={() => updateCart(cartItem.product, -1)}>
        //                                 -
        //                             </button>
        //                             <span className="text-xs">{cartItem.count}</span>
        //                             <button onClick={() => updateCart(cartItem.product, 1)}>
        //                                 +
        //                             </button>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         );
        //     })}

        //     <div className="w-full h-0.5 bg-gray-200" />

        //     <div className="mt-auto p-4">
        //         <div className="py-4">
        //             <h1 className="font-semibold text-xl uppercase">Total</h1>
        //             <p className="font-semibold">
        //                 <span className="text-gray-400 font-normal">
        //                     The total of your cart is:
        //                 </span>{" "}
        //                 ${countTotalPrice()}
        //             </p>
        //         </div>

        //         <button
        //             onClick={() => {
        //                 if (isLoggedIn) {
        //                     console.log("send data to the server and create payment link");
        //                     router.push("/checkout");
        //                 } else {
        //                     router.push("/auth/sign-in");
        //                 }
        //                 onRequestClose && onRequestClose();
        //             }}
        //             className="border-2 border-orange-600 py-2 w-full rounded text-orange-600 uppercase"
        //         >
        //             Checkout
        //         </button>
        //         <button
        //             onClick={onRequestClose}
        //             className="outline-none block mt-4 text-center w-full uppercase"
        //         >
        //             Close
        //         </button>
        //     </div>
        // </div>
    );
};

export default SideCart;
