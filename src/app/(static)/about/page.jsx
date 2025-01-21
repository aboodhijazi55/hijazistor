import Image from "next/image"
import styles from "./page.module.css"
import Link from "next/link"
// import heroBannerImage from "../../../../public/images/"
export default function page() {
    return (
        <>
            <div className={styles.heroBannerContainer}>
                <div>
                    <p className={styles.beatsSolo}>Best Shop</p>
                    <h3>For</h3>
                    <h1>ELECTRONICS</h1>
                    <Image
                        src="/images/icons/headphones_a_4.webp"
                        alt="headphones"
                        width={450}
                        height={450}
                        className={styles.heroBannerImage} />
                    <div className={styles.desc}>
                        <h5>Description</h5>
                        <p>Welcome to HIJAZISTORE, your one-stop destination for the latest and most trusted gadgets in the market! We specialize in providing high-quality mobile phones, headphones, and TVs at unbeatable prices. Whether you're looking to upgrade your smartphone, enjoy immersive audio, or experience crystal-clear visuals, HIJAZISTORE has you covered.</p>
                    </div>
                    <div>
                        <Link href={`/products`}>
                            <button type="button">See our amazing Products</button>
                        </Link>

                    </div>
                </div>
            </div>

        </>
    )
}
