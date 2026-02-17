import { makeAutoObservable, reaction, runInAction } from "mobx";
import type { Product, ProductVariant } from "./product-store.ts";
import { api } from "../api/axios-client.ts";

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
}


const STORAGE_KEY = "cart";

export class CartStore {
    items: CartItem[] = [];
    loading = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
        this.loadFromStorage();

        reaction(
            () => this.items.map((i) => ({ ...i })),
            () => this.saveToStorage()
        );
    }

    addToCart(product: Product, variant: ProductVariant, quantity = 1) {
        const existing = this.items.find(
            (i) => i.productId === product.id && i.variantId === variant.id
        );

        if (existing) {
            existing.quantity += quantity;
            return;
        }

        this.items.push({
            productId: product.id,
            variantId: variant.id,
            name: product.name,
            size: variant.size,
            slug: product.slug,
            color: product.color.name,
            price: variant.price,
            quantity,
            image: product.media[0]?.url,
        });
    }

    increaseQuantity(variantId: number) {
        const item = this.items.find((i) => i.variantId === variantId);
        if (item) item.quantity += 1;
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
        this.items = this.items.filter((i) => i.variantId !== variantId);
    }

    clearCart() {
        this.items = [];
    }

    get totalItemsCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    get productsTotalPrice() {
        return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

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
                    err?.response?.data?.message || "Ошибка при оформлении заказа";
                this.loading = false;
            });
        }
    }
}
