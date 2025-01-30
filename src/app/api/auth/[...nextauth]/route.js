import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcrypt";
import { neon } from '@neondatabase/serverless';
import GoogleProvider from "next-auth/providers/google";

const sql = neon(process.env.DATABASE_URL);

const handler = NextAuth({
    session: {
        strategy: "jwt",
        maxAge: 60 * 60, // 1 days
    }, pages: {
        signIn: 'login'
    }
    , jwt: {
        encryption: true,
    },
    secret: process.env.NEXTAUTH_SECRET,

    providers: [
        CredentialsProvider({

            credentials: {
                email: {},
                password: {}
            },

            async authorize(credentials, req) {

                const response = await sql`
                   SELECT * FROM users WHERE email =${credentials?.email}`


                const user = response[0]
                console.log("User fetched:", user);
                const passwordCorrect = await compare(credentials?.password || '', user.password);

                if (passwordCorrect) {
                    return {
                        id: user.id,
                        email: user.email,
                    }
                }
                return null
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    debug: process.env.NODE_ENV === "development",
})

export { handler as GET, handler as POST }