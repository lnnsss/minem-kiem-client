import { Helmet } from "react-helmet";
import Agreement from "../components/Agreement/Agreement.tsx";

export default function AgreementPage() {
    return (
        <>
            <Helmet>
                <title>Пользовательское Соглашение — MINEM KIEM</title>
                <meta
                    name="description"
                    content="Пользовательское Соглашение бренда MINEM KIEM: Права и обязанности сторон
, Условия действия соглашения и Контакты продавца."
                />
                <link rel="canonical" href="https://minem-kiem.ru/agreement" />
                <meta name="robots" content="index, follow" />
                <meta http-equiv="content-language" content="ru" />
                <meta name="author" content="MINEM KIEM" />
            </Helmet>

            <div className="wrapper" id="app"><Agreement /></div>
        </>
    );
}
