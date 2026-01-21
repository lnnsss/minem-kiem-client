import { Helmet } from "react-helmet";
import styles from "./ContactsPage.module.css";

export default function ContactsPage() {
    return (
        <div className={styles.page}>
            <Helmet>
                <title>Контакты</title>
            </Helmet>

            <h1>Контакты</h1>

            <div className={styles.info}>
                <p><b>Email:</b> support@example.com</p>
                <p><b>Телефон:</b> +7 (999) 123-45-67</p>
                <p><b>Адрес:</b> Москва, ул. Примерная 10</p>
            </div>
        </div>
    );
}
