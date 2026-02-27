import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./app-router";
import {OrderModal} from "./components/UI/OrderModal/OrderModal.tsx";
import ScrollToTop from "./components/UI/ScrollToTop.tsx";
import Preloader from "./components/UI/Preloader/Preloader.tsx";
import { Helmet } from "react-helmet";

export default function App() {
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
                <meta property="og:image" content="https://minem-kiem.ru/favicon.ico" />
                <meta property="og:locale" content="ru_RU" />

                <meta name="google-site-verification" content="aeg7ojJ-0SJsH8IgOj7marfX8YeQpTrgqCOyzAT4qDg" />
            </Helmet>
            <BrowserRouter>
                <ScrollToTop />
                <Preloader />
                <AppRouter />
                <OrderModal />
            </BrowserRouter>
        </>
    );
}
