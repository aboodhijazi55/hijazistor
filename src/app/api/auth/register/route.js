import { NextResponse } from "next/server";
import { hash } from "bcrypt"
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);
export async function POST(req) {
    try {
        const { email, password, username } = await req.json()

        const hashPassword = await hash(password, 10)
        await sql`
            INSERT INTO users (username,email ,password)
            VALUES (${username},${email},${hashPassword})
            `
        return NextResponse.json({ message: "success" })
    } catch (error) {
        if (error.message.includes("duplicate key")) {
            // Handle duplicate email error (assuming a unique constraint exists on email)
            return NextResponse.json({ error: "Email already exists" }, { status: 400 });
        }

        console.error("Unexpected error:", error);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}

