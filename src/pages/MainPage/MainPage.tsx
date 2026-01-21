import { Helmet } from "react-helmet";
import styles from "./MainPage.module.css";
import Main from "../../components/Main/Main.tsx";

export default function MainPage() {
    return (
        <div className={styles.page}>
            <Helmet>
                <title>Главная</title>
                <meta
                    name="description"
                    content="Российский бренд одежды для тех, кто хочет показать свою принадлежность к родной Республике Татарстан."
                />
                <meta property="og:title" content="Минем Кием — татарский бренд одежды" />
                <meta property="og:locale" content="ru_RU" />
            </Helmet>

            <Main />
        </div>
    );
}
