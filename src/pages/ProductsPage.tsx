import { Helmet } from "react-helmet";
import Products from "../components/Products/Products.tsx";

export default function ProductsPage() {

    return (
        <>
            <Helmet>
                <title>Каталог товаров</title>
            </Helmet>

            <div className="wrapper" id="app"><Products /></div>
        </>
    );
}
