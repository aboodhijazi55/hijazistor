
import Link from "next/link";
import styles from "./Navbar.module.css"
import { links } from "./data";
import Button from "../elements/Button/Button";
import Logo from "../elements/Logo/Logo";
import DarkMode from "../DarkMode/DarkMode";



export default function Navbar() {
    return (
        <>
            <div className={styles.contener}>
                <Logo />
                <div className={styles.links}>
                    <DarkMode />
                    {links.map(link => {
                        return <Link key={link.id} href={link.url} className={styles.link}>{link.title}</Link>
                    })}

                    <Button />

                </div>
            </div >
        </>
    )
}
