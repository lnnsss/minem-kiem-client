import { makeAutoObservable, reaction, runInAction } from "mobx";
import type { Product, ProductVariant } from "./product-store";
import { api } from "../api/axios-client";
import { Api } from "../api/api-helpers";

export interface CartItem {
    productId: number;
    variantId: number;
    name: string;
    slug: string;
    size: string;
    color: string;
    price: number;
    quantity: number;
    image?: string;
    stock: number;
}

const STORAGE_KEY = "cart";

export class CartStore {
    items: CartItem[] = [];
    loading = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);

        this.loadFromStorage();
        this.syncCartWithBackend();

        reaction(
            () => this.items.map((i) => ({ ...i })),
            () => this.saveToStorage()
        );
    }

    /* =======================
       GETTERS
    ======================= */

    get totalItemsCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    get productsTotalPrice() {
        return this.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    }

    getItemQuantity(productId: number, variantId: number) {
        const item = this.items.find(
            (i) => i.productId === productId && i.variantId === variantId
        );
        return item?.quantity || 0;
    }

    /* =======================
       CART ACTIONS
    ======================= */

    addToCart(product: Product, variant: ProductVariant, quantity = 1) {
        const existing = this.items.find(
            (i) =>
                i.productId === product.id &&
                i.variantId === variant.id
        );

        const current = existing ? existing.quantity : 0;
        const total = current + quantity;

        if (total > variant.stock) {
            alert(`Нельзя добавить больше ${variant.stock} шт.`);
            return;
        }

        if (existing) {
            existing.quantity = total;
            return;
        }

        this.items.push({
            productId: product.id,
            variantId: variant.id,
            name: product.name,
            slug: product.slug,
            size: variant.size,
            color: product.color.name,
            price: variant.price,
            quantity,
            image: product.media[0]?.url,
            stock: variant.stock,
        });
    }

    canIncreaseQuantity(variantId: number) {
        const item = this.items.find((i) => i.variantId === variantId);
        if (!item) return false;
        return item.quantity < item.stock;
    }

    increaseQuantity(variantId: number) {
        const item = this.items.find((i) => i.variantId === variantId);
        if (!item || !this.canIncreaseQuantity(variantId)) {
            alert(`Нельзя добавить больше ${item?.stock || 0} шт.`);
            return;
        }
        item.quantity += 1;
    }

    decreaseQuantity(variantId: number) {
        const item = this.items.find((i) => i.variantId === variantId);
        if (!item) return;

        if (item.quantity === 1) {
            this.removeFromCart(variantId);
        } else {
            item.quantity -= 1;
        }
    }

    removeFromCart(variantId: number) {
        this.items = this.items.filter(
            (i) => i.variantId !== variantId
        );
    }

    clearCart() {
        this.items = [];
    }

    /* =======================
       STORAGE
    ======================= */

    saveToStorage() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
    }

    loadFromStorage() {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return;

        try {
            this.items = JSON.parse(data);
        } catch {
            this.items = [];
        }
    }

    /* =======================
       VARIANTS
    ======================= */

    async syncCartWithBackend() {
        if (this.items.length === 0) return;

        const updatedItems: CartItem[] = [];

        for (const item of this.items) {
            try {
                const response = await Api.getProduct(item.slug);
                const product = response.data;

                const variant = product.variants.find(
                    (v: any) => v.id === item.variantId
                );

                if (!variant || !variant.is_active || variant.stock <= 0) {
                    continue;
                }

                const safeQuantity = Math.min(
                    item.quantity,
                    variant.stock
                );

                updatedItems.push({
                    ...item,
                    price: Number(variant.price),
                    stock: variant.stock,
                    quantity: safeQuantity,
                });
            } catch {
                continue;
            }
        }

        runInAction(() => {
            this.items = updatedItems;
        });
    }

    /* =======================
       ORDER
    ======================= */

    async placeOrder(customerInfo: {
        full_name: string;
        email: string;
        phone: string;
        shipping_address: string;
        comment?: string;
    }) {
        if (this.items.length === 0) {
            this.error = "Корзина пуста";
            return;
        }

        const payload = {
            items: this.items.map((i) => ({
                product_variant: i.variantId.toString(),
                quantity: i.quantity.toString(),
            })),
            customer_info: customerInfo,
        };

        this.loading = true;
        this.error = null;

        try {
            const response = await api.post("/orders/", payload);
            const paymentUrl = response.data.payment_url;

            runInAction(() => {
                this.clearCart();
                this.loading = false;
            });

            if (paymentUrl) {
                window.location.href = paymentUrl;
            }

            return response.data;
        } catch (err: any) {
            runInAction(() => {
                this.error =
                    err?.response?.data?.message ||
                    "Ошибка при оформлении заказа";
                this.loading = false;
            });
        }
    }
}