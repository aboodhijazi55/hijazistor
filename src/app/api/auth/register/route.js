import { NextResponse } from "next/server";
import { hash } from "bcrypt"
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);
export async function POST(req) {
    try {
        const { email, password, username } = await req.json()
        console.log({ email, password, username });
        const hashPassword = await hash(password, 10)
        await sql`
            INSERT INTO users (username,email ,password)
            VALUES (${username},${email},${hashPassword})
            `
    } catch (error) {
        alert("your Email already used")
        console.log([error]);
    }
    return NextResponse.json({ message: "success" })
}