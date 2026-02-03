import s from "./OrderModal.module.css";
import { useStores } from "../../../stores/use-stores";
import { observer } from "mobx-react-lite";
import CloseIcon from "./components/CloseIcon";
import ModalProduct from "./components/ModalProduct";
import { ModalInput } from "./components/ModalInput";
import { useState, useEffect } from "react";
import { YandexDeliveryWidget } from "./components/YandexDeliveryWidget";
import type { DeliveryPoint } from "./components/YandexDeliveryWidget";

export const OrderModal = observer(() => {
    const { modal, cart } = useStores();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [comment, setComment] = useState("");

    const [deliveryAddress, setDeliveryAddress] =
        useState<string | null>(null);
    const [deliveryPrice, setDeliveryPrice] =
        useState(0);
    const [deliverySelected, setDeliverySelected] =
        useState(false);

    const PRODUCTS_SUM = cart.productsTotalPrice;
    const TOTAL_SUM =
        PRODUCTS_SUM +
        (deliverySelected ? deliveryPrice : 0);

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
            onClick={() =>
                modal.setEditingModalActive(false)
            }
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

                {/* ТОВАРЫ */}
                <div className={s.modal_products}>
                    {cart.items.length === 0 && (
                        <p>Корзина пуста</p>
                    )}

                    {cart.items.map((item) => (
                        <ModalProduct
                            key={item.variantId}
                            slug={String(item.variantId)}
                            image={item.image!}
                            title={item.name}
                            size={item.size}
                            count={item.quantity}
                            price={item.price}
                            variantId={item.variantId}
                        />
                    ))}

                </div>

                <h3 className={s.modal_Price}>
                    Сумма: {PRODUCTS_SUM} руб
                </h3>

                {/* ДОСТАВКА */}
                <div className={s.modal_delivery}>
                    <h3>Доставка</h3>

                    {!deliverySelected && (
                        <YandexDeliveryWidget
                            onSelect={
                                handleDeliverySelect
                            }
                        />
                    )}

                    {deliverySelected && (
                        <div
                            className={s.selectedDelivery}
                        >
                            <strong>
                                Пункт выдачи:
                            </strong>
                            <div>{deliveryAddress}</div>
                            <div>
                                Стоимость:{" "}
                                {deliveryPrice} руб
                            </div>
                            <button
                                className={
                                    s.editDelivery
                                }
                                onClick={() => {
                                    setDeliverySelected(
                                        false
                                    );
                                    setDeliveryAddress(
                                        null
                                    );
                                    setDeliveryPrice(0);
                                }}
                            >
                                Изменить
                            </button>
                        </div>
                    )}
                </div>

                {/* ДАННЫЕ */}
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

                {/* ИТОГО */}
                <p className={s.modal_orderInfo}>
                    Сумма: {PRODUCTS_SUM} руб
                    <br />
                    Доставка:{" "}
                    {deliverySelected
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
                    disabled={
                        !deliverySelected ||
                        cart.items.length === 0
                    }
                >
                    К оплате
                </button>
            </div>
        </div>
    );
});
