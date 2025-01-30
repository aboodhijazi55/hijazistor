import React from 'react'
import styles from "./page.module.css"
import Image from 'next/image'
import { data } from '@/app/lib/data'
import { truncateText } from '../page'
import AddCard from '@/components/elements/AddCard/AddCard'

export default async function Post({ params }) {
    const product = await data[(params.id) - 1]
    console.log(product);



    return (
        <>
            <div className={styles.container} >
                <header className={styles.header}>
                    <div className={styles.imageContainer}>
                        <Image
                            className={styles.image}
                            src={product.image}
                            alt={product.title}
                            fill
                        />
                    </div>
                    <div className={styles.info}>

                        <h1 className={styles.title}>
                            {product.title}
                        </h1>
                        <p className={styles.description}>{product.description}</p>
                        <div className={styles.content}>
                            <ul className={styles.list}>
                                <li><h3>Brand : </h3> {product.brand}</li>
                                <li><h3>Model : </h3> {product.model}</li>
                                <li><h3>Color : </h3> {product.color}</li>
                            </ul>
                        </div>
                        <div className={styles.price}>
                            <h2>{product.price} $</h2>
                        </div>
                        <AddCard product={product} />
                    </div>

                </header>



            </div>

        </>
    )
}
