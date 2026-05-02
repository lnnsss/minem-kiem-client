import s from "./OrderModal.module.css";
import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../../stores/use-stores";
import CloseIcon from "./components/CloseIcon";
import ModalProduct from "./components/ModalProduct";
import { ModalInput } from "./components/ModalInput";
import { Cdek } from "./components/Cdek";

export const OrderModal = observer(() => {
    const { modal, cart } = useStores();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const [deliveryCode, setDeliveryCode] = useState<string>("");
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [comment, setComment] = useState("");
    const [isAgreed, setIsAgreed] = useState(false);
    const [deliveryTariff, setDeliveryTariff] = useState<"self_pickup" | "time_interval" | null>(null);

    const isFormFilled =
        name.trim() &&
        email.trim() &&
        phone.trim() &&
        deliveryAddress.trim() &&
        deliveryCode.trim();

    const PRODUCTS_SUM = cart.productsTotalPrice;
    const TOTAL_SUM = PRODUCTS_SUM + (deliveryAddress.trim() ? deliveryPrice : 0);

    useEffect(() => {
        if (modal.editingModalActive) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [modal.editingModalActive]);

    useEffect(() => {
        console.log("[OrderModal] deliveryPrice state updated:", deliveryPrice);
    }, [deliveryPrice]);

    if (!modal.editingModalActive) return null;

    const calculateDelivery = async (address: string, tariff: string, cdek_pvz_code?: string) => {
        try {
            const payload: any = {
                items: cart.items.map(item => ({
                    product_variant: item.variantId,
                    quantity: item.quantity
                })),
                address,
                tariff,
            };
            if (tariff === "self_pickup" && cdek_pvz_code) {
                payload.cdek_pvz_code = cdek_pvz_code;
            }

            const apiBase = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
            const deliveryUrl = `${apiBase}/delivery/calculate/`;
            const res = await fetch(deliveryUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data?.detail || data?.error || `HTTP ${res.status}`);
            }

            const nextDeliveryPrice = Number(data?.cost);
            if (!Number.isFinite(nextDeliveryPrice)) {
                throw new Error(`Некорректная стоимость доставки: ${data?.cost}`);
            }

            setDeliveryPrice(nextDeliveryPrice);
            console.log("[OrderModal] Delivery cost API response:", data);
            console.log("[OrderModal] Delivery cost saved to state:", nextDeliveryPrice);
        } catch (err) {
            console.error("Ошибка расчета доставки:", err);
            setDeliveryPrice(0);
        }
    };

    const handlePlaceOrder = async (
        paymentMethod: "sbp" | "sber_bnpl" | "bank_card" = "sbp",
    ) => {
        if (!isFormFilled || !isAgreed || cart.items.length === 0) return;

        const customerInfo = {
            full_name: name,
            email,
            phone,
            shipping_address: deliveryAddress,
            comment,
        };

        console.log("Order payload:", customerInfo);
        console.log("paymentMethod:", paymentMethod);
        console.log("deliveryCode:", deliveryCode);

        await cart.placeOrder(customerInfo, paymentMethod, deliveryCode);

        if (!cart.error) {
            modal.setEditingModalActive(false);
            setName("");
            setEmail("");
            setPhone("");
            setDeliveryAddress("");
            setComment("");
            setIsAgreed(false);
            setDeliveryPrice(0);
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
                <ModalInput label="Комментарий" textarea value={comment} onChange={setComment} />

                <div className={s.cdek}>
                    <Cdek
                        onSelect={(address, code, price) => {
                            setDeliveryAddress(address);
                            setDeliveryCode(code);
                            const tariffType = code ? "self_pickup" : "time_interval";
                            setDeliveryTariff(tariffType);
                            calculateDelivery(address, tariffType, code);
                        }}
                    />
                </div>

                <p className={s.vpnWarning}>Виджет может не работать с включённым VPN</p>

                {/* ИТОГО */}
                <p className={s.modal_orderInfo}>
                    Сумма товаров: {PRODUCTS_SUM} руб
                    <br />
                    Доставка: {deliveryAddress.trim() ? `${deliveryPrice} руб` : "не выбрана"}
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
                            <a href="/oferta" target="_blank" className={s.docLink}>Договор-оферта</a>,{" "}
                            <a href="/agreement" target="_blank" className={s.docLink}>Согласие на обработку персональных данных</a>,{" "}
                            <a href="/politics" target="_blank" className={s.docLink}>Политика конфиденциальности</a>
                        </span>
                    </label>
                </div>

                <div className={s.buyBtns}>
                    <button
                        className={s.buyBtn}
                        disabled={!isFormFilled || cart.items.length === 0 || !isAgreed || cart.loading}
                        onClick={() => handlePlaceOrder("sbp")}
                    >
                        {cart.loading ? "Отправка..." : "К оплате"}
                    </button>
                </div>

                {cart.error && <p className={s.error}>{cart.error}</p>}
            </div>
        </div>
    );
});
