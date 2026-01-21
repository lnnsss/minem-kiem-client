import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Api } from "../../api/api-helpers";
import styles from "./ProductsPage.module.css";
import { Link } from "react-router-dom";

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Api.getProducts()
            .then((res) => setProducts(res.data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className={styles.loader}>Загрузка...</div>;

    return (
        <>
            <Helmet>
                <title>Каталог</title>
            </Helmet>
            <div className={styles.page}>
                <Helmet>
                    <title>Каталог товаров</title>
                </Helmet>

                <h1>Каталог</h1>

                <div className={styles.grid}>
                    {products.map((p) => (
                        <Link to={`/product/${p.id}`} className={styles.card} key={p.id}>
                            {p.image && <img src={p.image} />}
                            <h3>{p.title}</h3>
                            <div className={styles.price}>{p.price} ₽</div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
