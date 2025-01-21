
import styles from "./Footer.module.css"
import Image from "next/image"
export default function Footer() {


    return (
        <>
            <div className={styles.container}>
                <div>©2025 HijaziStore , All Rights Reserved </div>
                <div className={styles.social}>
                    <Image
                        src="/images/icons/facebook.png"
                        alt="facebook"
                        height={20}
                        width={20}
                        className={styles.icon}
                    />
                    <Image
                        src="/images/icons/instagram.png"
                        alt="instagram"
                        height={20}
                        width={20}
                        className={styles.icon}
                    />
                    <Image
                        src="/images/icons/telegram.png"
                        alt="telegram"
                        height={20}
                        width={20}
                        className={styles.icon}
                    />
                    <Image
                        src="/images/icons/twitter.png"
                        alt="twitter"
                        height={20}
                        width={20}
                        className={styles.icon}
                    />
                    <Image
                        src="/images/icons/youtube.png"
                        alt="youtube"
                        height={20}
                        width={20}
                        className={styles.icon}
                    />
                </div>
            </div >

        </>
    )
}

