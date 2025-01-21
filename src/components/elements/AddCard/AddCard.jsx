"use client"
import React from 'react'
import styles from "../../../app/(dynamic)/products/page.module.css"
export default function AddCard() {
    return (
        <button
            className={styles.addCardButton}
            onClick={() => { console.log("logout") }}
        >Add card</button>
    )
}
