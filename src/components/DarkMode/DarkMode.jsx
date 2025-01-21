"use client"
import { useContext } from "react"
import styles from "./DarkMode.module.css"
import { ThemeContext } from "@/context/ThemeContext"
export default function DarkMode() {
    const { mode, toggle } = useContext(ThemeContext)

    return (
        <>
            <div className={styles.contaniner} onClick={toggle}>
                <div className={styles.icon}>☀️</div>
                <div className={styles.icon}>🌑</div>
                <div className={styles.switcher}
                    style={mode === 'dark' ? { left: "2px" } : { right: "2px" }}
                />
            </div>
        </>)
}
