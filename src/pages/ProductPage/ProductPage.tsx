import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import styles from "./ProductPage.module.css";
import { Api } from "../../api/api-helpers";
import Product from "../../components/Product/Product.tsx";

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        Api.getProduct(id)
            .then((res) => setProduct(res.data))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className={styles.loader}>Загрузка...</div>;
    if (!product) return <div className={styles.error}>Товар не найден</div>;

    return (
        <div className={styles.page}>
            <Helmet>
                <title>{product.title}</title>
            </Helmet>

            <Product product={product} />
        </div>
    );
}
