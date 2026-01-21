import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";
import { Helmet } from "react-helmet";

export default function NotFoundPage() {
    return (
        <div className={styles.page}>
            <Helmet>
                <title>Страница не найдена</title>
            </Helmet>

            <h1>404</h1>
            <p>Такой страницы не существует.</p>

            <Link to="/" className={styles.back}>
                На главную
            </Link>
        </div>
    );
}
