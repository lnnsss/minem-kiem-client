import { Helmet } from "react-helmet";
import Product from "../components/Product/Product.tsx";

export default function ProductPage() {

    return (
        <>
            <Helmet>
                <title>Товар — MINEM KIEM</title>
                <meta
                    name="description"
                    content="Товар бренда MINEM KIEM: фото, название, описание, размеры и цена."
                />
                <meta name="robots" content="index, follow" />
                <meta http-equiv="content-language" content="ru" />
                <meta name="author" content="MINEM KIEM" />
            </Helmet>

            <div className="wrapper" id="app"><Product /></div>
        </>
    );
}
