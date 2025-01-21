"use client"
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css"
import AddCard from "@/components/elements/AddCard/AddCard";
import { data } from "@/app/lib/data";
import { useEffect, useState } from "react";



export const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
};

export default function Products() {
    const [selectedValue, setSelectedValue,] = useState("all");
    const [filterValue, setFilterValue] = useState([]);


    const handleRadioChange = (value) => {
        setSelectedValue(value);

    };


    useEffect(() => {
        const filter = data.filter((x) => {
            return x.category === selectedValue
        })
        if (selectedValue === "all") {
            setFilterValue(data)
        } else {
            setFilterValue(filter)
        }
    }, [selectedValue])
    return <>
        <div className={styles.categoryContainer} >
            <h2 className={styles.h2}>
                Category
            </h2>
            <div className={styles.category} >
                <input type="radio" id="All" name="contact" value="all" className={styles.radioInput}
                    onInput={() => handleRadioChange("all")}

                />
                <label htmlFor="All" className={styles.radioLabel} >All</label>

                <input type="radio" id="audio" name="contact" value="audio" className={styles.radioInput}
                    onInput={() => handleRadioChange("audio")}
                />
                <label htmlFor="audio" className={styles.radioLabel}>Audio</label>

                <input type="radio" id="gaming" name="contact" value="gaming" className={styles.radioInput}
                    onInput={() => handleRadioChange("gaming")}
                />
                <label htmlFor="gaming" className={styles.radioLabel}>Gaming</label>

                <input type="radio" id="mobile" name="contact" value="mobile" className={styles.radioInput}
                    onInput={() => handleRadioChange("mobile")}
                />
                <label htmlFor="mobile" className={styles.radioLabel}>mobile</label>

                <input type="radio" id="tv" name="contact" value="tv" className={styles.radioInput}
                    onInput={() => handleRadioChange("tv")}
                />
                <label htmlFor="tv" className={styles.radioLabel}>TV</label>
            </div >
        </div>
        <div className={styles.mainContainer}>


            {filterValue.map(product => {
                return <>
                    <div className={styles.cardContainer} key={product.id}>
                        <Link href={`/products/${product.id}`} className={styles.post} >
                            <div className={styles.imageContainer}>
                                <Image
                                    className={styles.image}
                                    src={product.image}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    fill={true}
                                    alt="post"
                                />
                            </div>
                            <div className={styles.content}>
                                <h1 className={styles.title}>{truncateText(product.title, 50)}</h1>
                                <p className={styles.text}>{product.brand}</p>
                            </div>
                        </Link>
                        <div className={styles.addCard} >
                            <AddCard />
                            <h3 className={styles.price}>{product.price} $</h3>
                        </div>
                    </div>
                </>
            })}






        </div>

    </>
}
