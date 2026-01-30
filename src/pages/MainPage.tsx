import { Helmet } from "react-helmet";
import Main from "../components/Main/Main.tsx";

export default function MainPage() {
    return (
        <>
            <Helmet>
                <title>Главная</title>
                <meta
                    name="description"
                    content="Российский бренд одежды для тех, кто хочет показать свою принадлежность к родной Республике Татарстан."
                />
                <meta property="og:title" content="Минем Кием — татарский бренд одежды" />
                <meta property="og:locale" content="ru_RU" />
            </Helmet>

            <div className="wrapper" id="app"><Main /></div>
        </>
    );
}
