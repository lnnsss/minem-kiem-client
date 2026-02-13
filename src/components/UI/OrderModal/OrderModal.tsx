import s from "./OrderModal.module.css";
import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../../stores/use-stores";
import CloseIcon from "./components/CloseIcon";
import ModalProduct from "./components/ModalProduct";
import { ModalInput } from "./components/ModalInput";
import { YandexDeliveryWidget } from "./components/YandexDeliveryWidget";
import type { DeliveryPoint } from "./components/YandexDeliveryWidget";

export const OrderModal = observer(() => {
    const { modal, cart } = useStores();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [comment, setComment] = useState("");

    const [deliveryAddress, setDeliveryAddress] =
        useState<string | null>(null);
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [deliverySelected, setDeliverySelected] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);

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

                <ModalInput
                    label="ФИО"
                    value={name}
                    onChange={setName}
                />

                <ModalInput
                    label="Еmail"
                    value={email}
                    onChange={setEmail}
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

                <div className={s.agreement}>
                    <label className={s.checkboxLabel}>
                        <input type="checkbox" checked={isAgreed}
                            onChange={(e) => setIsAgreed(e.target.checked)} />
                        <span>
                            Я согласен с{" "}
                            <a href="/oferta" target="_blank" className={s.docLink}>Договор-оферта</a>,{" "}
                            <a href="/agreement" target="_blank" className={s.docLink}>Согласие на обработку персональных данных</a>,{" "}
                            <a href="/politics" target="_blank" className={s.docLink}>Политика конфиденциальности</a>
                        </span>
                    </label>
                </div>

                <button className={s.buyBtn}
                    disabled={ !deliverySelected || cart.items.length === 0 || !isAgreed}>
                    К оплате
                </button>
            </div>
        </div>
    );
});
