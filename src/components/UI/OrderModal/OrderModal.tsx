import s from "./OrderModal.module.css";
import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../../stores/use-stores";
import CloseIcon from "./components/CloseIcon";
import ModalProduct from "./components/ModalProduct";
import { ModalInput } from "./components/ModalInput";

export const OrderModal = observer(() => {
    const { modal, cart } = useStores();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [comment, setComment] = useState("");
    const [isAgreed, setIsAgreed] = useState(false);

    const DELIVERY_COST = 400;

    const isFormFilled =
        name.trim() &&
        email.trim() &&
        phone.trim() &&
        deliveryAddress.trim();

    const PRODUCTS_SUM = cart.productsTotalPrice;
    const TOTAL_SUM = PRODUCTS_SUM + (deliveryAddress.trim() ? DELIVERY_COST : 0);

    useEffect(() => {
        if (modal.editingModalActive) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [modal.editingModalActive]);

    if (!modal.editingModalActive) return null;

    const handlePlaceOrder = async () => {
        if (!isFormFilled || !isAgreed || cart.items.length === 0) return;

        const customerInfo = {
            full_name: name,
            email,
            phone,
            shipping_address: deliveryAddress,
            comment,
        };

        await cart.placeOrder(customerInfo);

        if (!cart.error) {
            modal.setEditingModalActive(false);
            setName("");
            setEmail("");
            setPhone("");
            setDeliveryAddress("");
            setComment("");
            setIsAgreed(false);
        } else {
            alert(`Ошибка: ${cart.error}`);
        }
    };

    return (
        <div className={s.overlay} onClick={() => modal.setEditingModalActive(false)}>
            <div className={s.modal} onClick={(e) => e.stopPropagation()}>
                <div className={s.modal_header}>
                    <h2>Корзина</h2>
                    <button onClick={() => modal.setEditingModalActive(false)}>
                        <CloseIcon />
                    </button>
                </div>

                {/* ТОВАРЫ */}
                <div className={s.modal_products}>
                    {cart.items.length === 0 && <p>Корзина пуста</p>}

                    {cart.items.map((item) => (
                        <ModalProduct
                            key={item.variantId}
                            slug={item.slug}
                            image={item.image!}
                            title={item.name}
                            size={item.size}
                            count={item.quantity}
                            price={item.price}
                            variantId={item.variantId}
                            onIncrease={() => cart.increaseQuantity(item.variantId)}
                            onDecrease={() => cart.decreaseQuantity(item.variantId)}
                            canIncrease={cart.canIncreaseQuantity(item.variantId)}
                        />
                    ))}
                </div>

                <h3 className={s.modal_Price}>Сумма: {PRODUCTS_SUM} руб</h3>

                <ModalInput label="ФИО" value={name} onChange={setName} />
                <ModalInput label="Email" value={email} onChange={setEmail} />
                <ModalInput
                    label="Телефон"
                    phone
                    value={phone}
                    onChange={setPhone}
                    placeholder="+7 (___) ___-__-__"
                />
                <ModalInput
                    label="Адрес доставки (ближайший адрес пункта выдачи к вашему дому)"
                    value={deliveryAddress}
                    onChange={setDeliveryAddress}
                    placeholder="Казань, Кремлёвская, 8"
                />
                <ModalInput
                    label="Комментарий"
                    textarea
                    value={comment}
                    onChange={setComment}
                />

                {/* ИТОГО */}
                <p className={s.modal_orderInfo}>
                    Сумма товаров: {PRODUCTS_SUM} руб
                    <br />
                    Доставка: {deliveryAddress.trim() ? `${DELIVERY_COST} руб` : "не выбрана"}
                    <br />
                    {deliveryAddress || "Пункт выдачи не выбран"}
                </p>

                <div className={s.modal_totalPrice}>Итоговая сумма: {TOTAL_SUM} руб</div>

                <div className={s.agreement}>
                    <label className={s.checkboxLabel}>
                        <input
                            type="checkbox"
                            checked={isAgreed}
                            onChange={(e) => setIsAgreed(e.target.checked)}
                        />
                        <span>
                            Я согласен с{" "}
                            <a href="/oferta" target="_blank" className={s.docLink}>
                                Договор-оферта
                            </a>
                            ,{" "}
                            <a href="/agreement" target="_blank" className={s.docLink}>
                                Согласие на обработку персональных данных
                            </a>
                            ,{" "}
                            <a href="/politics" target="_blank" className={s.docLink}>
                                Политика конфиденциальности
                            </a>
                        </span>
                    </label>
                </div>

                <button
                    className={s.buyBtn}
                    disabled={!isFormFilled || cart.items.length === 0 || !isAgreed || cart.loading}
                    onClick={handlePlaceOrder}
                >
                    {cart.loading ? "Отправка..." : "К оплате"}
                </button>

                {cart.error && <p className={s.error}>{cart.error}</p>}
            </div>
        </div>
    );
});
