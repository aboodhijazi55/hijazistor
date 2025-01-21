
import Link from "next/link"
import { Montserrat } from "next/font/google";
const logoFont = Montserrat({
    subsets: ["latin"],
    weight: ["600"]
})
import styles from "./Logo.module.css"
export default function Logo() {
    return (
        <Link href="/" className={`${styles.logo} ${logoFont.className}`}>HIJAZISTORE</Link>
    )
}
