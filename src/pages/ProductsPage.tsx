import { Helmet } from "react-helmet";
import Products from "../components/Products/Products.tsx";

export default function ProductsPage() {

    return (
        <>
            <Helmet>
                <title>Каталог товаров — MINEM KIEM</title>
                <meta
                    name="description"
                    content="Каталог бренда MINEM KIEM: футболки, свитшоты, худи и др."
                />
                <link rel="canonical" href="https://minem-kiem.ru/shop" />
                <meta name="robots" content="index, follow" />
                <meta http-equiv="content-language" content="ru" />
                <meta name="author" content="MINEM KIEM" />

                <meta property="og:title" content="Каталог товаров — MINEM KIEM" />
                <meta property="og:description" content="Каталог бренда MINEM KIEM: футболки, свитшоты, худи и др." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://minem-kiem.ru/shop" />
                <meta property="og:image" content="https://minem-kiem.ru/favicon.png" />
                <meta property="og:locale" content="ru_RU" />
            </Helmet>

            <div className="wrapper" id="app"><Products /></div>
        </>
    );
}
