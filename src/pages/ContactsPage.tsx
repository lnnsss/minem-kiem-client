import { Helmet } from "react-helmet";
import Contacts from "../components/Contacts/Contacts.tsx";

export default function ContactsPage() {
    return (
        <>
            <Helmet>
                <title>Контакты — MINEM KIEM</title>
                <meta
                    name="description"
                    content="Контакты бренда MINEM KIEM: email, соцсети и адрес для сотрудничества и заказов."
                />
                <link rel="canonical" href="https://minem-kiem.ru/contacts" />
                <meta name="robots" content="index, follow" />
                <meta http-equiv="content-language" content="ru" />
                <meta name="author" content="MINEM KIEM" />

                <meta property="og:title" content="Контакты — MINEM KIEM" />
                <meta property="og:description" content="Контакты бренда MINEM KIEM: email, соцсети и адрес для сотрудничества и заказов." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://minem-kiem.ru/contacts" />
                <meta property="og:image" content="https://minem-kiem.ru/favicon.ico" />
                <meta property="og:locale" content="ru_RU" />
            </Helmet>

            <div className="wrapper" id="app"><Contacts /></div>
        </>
    );
}
