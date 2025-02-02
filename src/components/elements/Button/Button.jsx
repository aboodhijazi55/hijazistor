
// import styles from "../../Navbar/Navbar.module.css"
// import Link from "next/link"
// import { useSession } from "next-auth/react"
// import { getServerSession } from "next-auth";
// import Logout from "@/app/(login)/logout";
// export default function Button() {
//     const session = getServerSession()
//     return (
//         <button
//             className={styles.logout}
//         >{session ? <Link href="/login">Login</Link> : <Logout />}
//         </button>

//     )
// }
'use client'; // Ensures this is a client component

import styles from "../../Navbar/Navbar.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Logout from "@/app/(login)/logout";


export default function Button() {
    const { data: session, status } = useSession(); // Access session and status

    if (status === "loading") {
        // While the session is loading, show a loading state
        return <button className={styles.logout}>Loading...</button>;
    }

    return (
        <button className={styles.logout}>
            {session ? <Logout /> : <Link href="/login">Login</Link>}
        </button>
    );
}



