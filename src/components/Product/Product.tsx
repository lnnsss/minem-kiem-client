import styles from "./Product.module.css";
import { useStores } from "../../stores/use-stores";

interface ProductProps {
    product: {
        id: string | number;
        title: string;
        description: string;
        price: number;
        image?: string;
    };
}

export default function Product({ product }: ProductProps) {
    const { cart } = useStores();

    return (
        <div className={styles.card}>
            {product.image && (
                <img src={product.image} className={styles.image} />
            )}

            <h1 className={styles.title}>{product.title}</h1>
            <p className={styles.description}>{product.description}</p>

            <div className={styles.bottom}>
                <div className={styles.price}>{product.price} ₽</div>

                <button
                    className={styles.btn}
                    onClick={() => cart.addItem(product)}
                >
                    Добавить в корзину
                </button>
            </div>
        </div>
    );
}
