"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import styles from "./page.module.css"
import Link from "next/link"
export default function Form() {

    const router = useRouter()
    const handleSub = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const response = await signIn('credentials', {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false,
        });
        if (!response?.error) {
            router.push("/")
            router.refresh()
        } else {

            alert("Login failed. Please check your credentials.");
        }

    }

    return (
        <div className={styles.contaner}>
            <h1 className={styles.title}>Welcome Back</h1>
            <form className={styles.form} onSubmit={handleSub}>
                <label className={styles.label} htmlFor="email">Email:</label>
                <input className={styles.input} name="email" type="email"  ></input>
                <label className={styles.label} htmlFor="password">Password:</label>
                <input className={styles.input} name="password" type="password"></input>
                <button className={styles.button} type="submit" >Login</button>
            </form>
            <p className={styles.text}>if you dont have an acouunt u can <span><Link href='/register'>Register</Link></span></p>
        </div>
    )
}
