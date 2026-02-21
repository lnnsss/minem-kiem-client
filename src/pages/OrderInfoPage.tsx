import { Helmet } from "react-helmet";
import OrderInfo from "../components/OrderInfo/OrderInfo";

export default function OrderInfoPage() {
    return (
        <>
            <Helmet>
                <title>Информация о заказе</title>
            </Helmet>

            <div className="wrapper" id="app"><OrderInfo /></div>
        </>
    );
}
