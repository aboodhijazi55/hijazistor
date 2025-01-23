'use client';

// import { useSession } from "next-auth/react";
// import { getServerSession } from "next-auth";

// import Link from "next/link";
// import Logout from "@/app/(login)/logout";

// export default function SessionWrapper() {
//     const session = getServerSession()
//     return (
//         <nav>
//             {session ? <Logout /> : <Link href="/login">Login</Link>}
//         </nav>
//     );
// }

'use client';

import { SessionProvider } from "next-auth/react";

/**
 * SessionWrapper Component
 * Wraps the application in a SessionProvider to handle session data.
 *
 * @param {object} props - The props for the SessionWrapper.
 * @param {React.ReactNode} props.children - The children components to be wrapped.
 * @param {object} props.session - The session object fetched server-side.
 */
export default function SessionWrapper({ children, session }) {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    );
}