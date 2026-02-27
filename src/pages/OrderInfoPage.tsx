import { Helmet } from "react-helmet";
import OrderInfo from "../components/OrderInfo/OrderInfo";

export default function OrderInfoPage() {
    return (
        <>
            <Helmet>
                <title>Информация о заказе — MINEM KIEM</title>
                <meta
                    name="description"
                    content="Информация о заказе из магазина MINEM KIEM."
                />
                <meta name="robots" content="index, follow" />
                <meta http-equiv="content-language" content="ru" />
                <meta name="author" content="MINEM KIEM" />
            </Helmet>

            <div className="wrapper" id="app"><OrderInfo /></div>
        </>
    );
}
