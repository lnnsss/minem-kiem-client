import { Helmet } from "react-helmet";
import Main from "../components/Main/Main.tsx";

export default function MainPage() {
    return (
        <>
            <Helmet>
                <title>Главная — MINEM KIEM</title>
                <meta
                    name="description"
                    content="Российский бренд одежды MINEM KIEM для тех, кто хочет показать свою принадлежность к родной Республике Татарстан."
                />
                <link rel="canonical" href="https://minem-kiem.ru" />
                <meta name="robots" content="index, follow" />
                <meta http-equiv="content-language" content="ru" />
                <meta name="author" content="MINEM KIEM" />

                <meta property="og:title" content="Минем Кием — татарский бренд одежды" />
                <meta property="og:description" content="Российский бренд одежды из Татарстана." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://minem-kiem.ru/" />
                <meta property="og:image" content="https://minem-kiem.ru/favicon.png" />
                <meta property="og:locale" content="ru_RU" />
            </Helmet>

            <div className="wrapper" id="app"><Main /></div>
        </>
    );
}
