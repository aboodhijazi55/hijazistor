'use client'
import styles from "./page.module.css"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Form() {
    const router = useRouter()
    const [alertMessage, setAlertMessage] = useState(null); // State for alert

    const handleSub = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" }, // Added content-type header

            body: JSON.stringify({
                username: formData.get("username"),
                email: formData.get('email'),
                password: formData.get('password')
            })
        })
        console.log("form respons ", response);
        const result = await response.json();

        if (response.ok) {
            router.push("/");
        } else {
            setAlertMessage(result.error || "Registration failed. Please try again."); // Set alert message
        }
        console.log(response);
    }
    const closeAlert = () => setAlertMessage(null); // Close alert

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
            {alertMessage && (
                <div className={styles.alert}>
                    <p>{alertMessage}</p>
                    <button className={styles.closeButton} onClick={closeAlert}>
                        X
                    </button>
                </div>
            )}
            <p className={styles.text}>If you already have an account :  <span><Link href='/login'>Login</Link></span></p>
        </div>

    )
}
