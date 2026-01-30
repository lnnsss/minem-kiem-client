import { Helmet } from "react-helmet";
import Product from "../components/Product/Product.tsx";

export default function ProductPage() {

    return (
        <>
            <Helmet>
                <title>Товар</title>
            </Helmet>

            <div className="wrapper" id="app"><Product /></div>
        </>
    );
}
