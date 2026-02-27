import { Helmet } from "react-helmet";
import Politics from "../components/Politics/Politics.tsx";

export default function PoliticsPage() {
    return (
        <>
            <Helmet>
                <title>Политика обработки персональных данных — MINEM KIEM</title>
                <meta
                    name="description"
                    content="Политика обработки персональных данных бренда MINEM KIEM: Термины, Введение, Персональные данные,
                    Цели обработки персональных данных, Принципы обработки персональных данных, Условия обработки персональных данных,
                    Обязательства сторон, Меры по обеспечению безопасности данных при их обработке, Обработчики данных и другие сайты
                    и Контакты продавца."
                />
                <link rel="canonical" href="https://minem-kiem.ru/politics" />
                <meta name="robots" content="index, follow" />
                <meta http-equiv="content-language" content="ru" />
                <meta name="author" content="MINEM KIEM" />
            </Helmet>

            <div className="wrapper" id="app"><Politics /></div>
        </>
    );
}
