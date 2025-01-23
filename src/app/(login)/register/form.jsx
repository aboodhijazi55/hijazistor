'use client'
import styles from "./page.module.css"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Form() {
    const router = useRouter()

    const handleSub = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const response = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({
                username: formData.get("username"),
                email: formData.get('email'),
                password: formData.get('password')
            })
        })
        console.log("form respons ", response);

        if (!response?.error) {
            router.push("/")
        } else {
            alert("register failed. Please check your try again");
        }
        console.log(response);
    }

    return (

        <div className={styles.contaner}>
            <h1 className={styles.title}>Join Us</h1>
            <form className={styles.form} onSubmit={handleSub}>
                <label className={styles.label} htmlFor="username">Username:</label>
                <input className={styles.input} name="username" type="text" required ></input>
                <label className={styles.label} htmlFor="email">Email:</label>
                <input className={styles.input} name="email" type="email" required ></input>
                <label className={styles.label} htmlFor="password">Password:</label>
                <input className={styles.input} name="password" type="password" required></input>
                <button className={styles.button} type="submit" >Sing Up</button>
            </form>
            <p className={styles.text}>If you already have an account :  <span><Link href='/login'>Login</Link></span></p>
        </div>

    )
}
