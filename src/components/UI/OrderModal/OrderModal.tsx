import s from "./OrderModal.module.css";
import { useStores } from "../../../stores/use-stores";
import { observer } from "mobx-react-lite";
import CloseIcon from "./components/CloseIcon";
import cover from "./assets/images/cover.jpg";
import ModalProduct from "./components/ModalProduct";
import { ModalInput } from "./components/ModalInput";
import { useState, useEffect } from "react";
import { YandexDeliveryWidget } from "./components/YandexDeliveryWidget";
import type { DeliveryPoint } from "./components/YandexDeliveryWidget";

export const OrderModal = observer(() => {
    const { modal } = useStores();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [comment, setComment] = useState("");

    const [deliveryAddress, setDeliveryAddress] =
        useState<string | null>(null);
    const [deliveryPrice, setDeliveryPrice] =
        useState<number>(0);
    const [deliverySelected, setDeliverySelected] =
        useState(false);

    const PRODUCTS_SUM = 15000;
    const TOTAL_SUM = PRODUCTS_SUM + deliveryPrice;

    // блокируем скролл body при открытой модалке
    useEffect(() => {
        if (modal.editingModalActive) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [modal.editingModalActive]);

    if (!modal.editingModalActive) return null;

    const handleDeliverySelect = (point: DeliveryPoint) => {
        setDeliveryAddress(point.address);
        setDeliveryPrice(point.price);
        setDeliverySelected(true);
    };

    return (
        <div
            className={s.overlay}
            onClick={() => modal.setEditingModalActive(false)}
        >
            <div
                className={s.modal}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={s.modal_header}>
                    <h2>Корзина</h2>
                    <button
                        onClick={() =>
                            modal.setEditingModalActive(false)
                        }
                    >
                        <CloseIcon />
                    </button>
                </div>

                <div className={s.modal_products}>
                    <ModalProduct
                        slug="sweatshirt-black-2"
                        image={cover}
                        title="Худи Нижнекамск"
                        size="S"
                        count={2}
                        price={5000}
                    />
                    <ModalProduct
                        slug="sweatshirt-black-2"
                        image={cover}
                        title="Худи Нижнекамск"
                        size="M"
                        count={1}
                        price={5000}
                    />
                </div>

                <h3 className={s.modal_Price}>
                    Сумма: {PRODUCTS_SUM} руб
                </h3>

                <div className={s.modal_delivery}>
                    <h3>Доставка</h3>

                    {!deliverySelected && (
                        <YandexDeliveryWidget
                            onSelect={handleDeliverySelect}
                        />
                    )}

                    {deliverySelected && (
                        <div className={s.selectedDelivery}>
                            <strong>Пункт выдачи:</strong>
                            <div>{deliveryAddress}</div>
                            <div>
                                Стоимость: {deliveryPrice} руб
                            </div>
                            <button
                                onClick={() => {
                                    setDeliverySelected(false);
                                    setDeliveryAddress(null);
                                    setDeliveryPrice(0);
                                }}
                            >
                                Изменить
                            </button>
                        </div>
                    )}
                </div>

                <ModalInput
                    label="ФИО"
                    value={name}
                    onChange={setName}
                />

                <ModalInput
                    label="Телефон"
                    phone
                    value={phone}
                    onChange={setPhone}
                    placeholder="+7 (___) ___-__-__"
                />

                <ModalInput
                    label="Комментарий"
                    textarea
                    value={comment}
                    onChange={setComment}
                />

                <p className={s.modal_orderInfo}>
                    Сумма: {PRODUCTS_SUM} руб
                    <br />
                    Доставка:{" "}
                    {deliveryPrice
                        ? `${deliveryPrice} руб`
                        : "не выбрана"}
                    <br />
                    {deliveryAddress ??
                        "Пункт выдачи не выбран"}
                </p>

                <div className={s.modal_totalPrice}>
                    Итоговая сумма: {TOTAL_SUM} руб
                </div>

                <button
                    className={s.buyBtn}
                    disabled={!deliverySelected}
                >
                    К оплате
                </button>
            </div>
        </div>
    );
});
