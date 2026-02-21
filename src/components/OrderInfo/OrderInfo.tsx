import s from "./OrderInfo.module.css";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Api } from "../../api/api-helpers";
import leftRnmnt from "./assets/images/leftRnmnt.png";
import rightRnmnt from "./assets/images/rightRnmnt.png";

interface Order {
    customer_info?: {
        email?: string;
    };
}

export default function OrderInfo() {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("id");

    const [email, setEmail] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!orderId) {
            setLoading(false);
            return;
        }

        const fetchOrder = async () => {
            try {
                const response = await Api.getOrder(orderId);
                const order: Order = response.data;

                if (order?.customer_info?.email) {
                    setEmail(order.customer_info.email);
                }
            } catch {
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) {
        return (
            <div className={s.OrderInfo}>
                <h1>Загрузка...</h1>
            </div>
        );
    }

    return (
        <div className={s.orderInfo}>
            <img src={leftRnmnt} alt="leftRnmnt" className={s.leftRnmnt} />
            <img src={rightRnmnt} alt="rightRnmnt" className={s.rightRnmnt} />

            <div className={`__container ${s.orderInfo_container}`}>
                <h1>Спасибо за покупку!</h1>

                <h2>
                    Вся информация о заказе скоро придёт вам на почту
                    {email && (
                        <>
                            <br />
                            <strong>{email}</strong>
                        </>
                    )}
                </h2>

                <Link to="/" className={s.btn}>На главную</Link>
            </div>
        </div>
    );
}