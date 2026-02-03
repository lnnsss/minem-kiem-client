import { makeAutoObservable, reaction } from "mobx";
import type { Product, ProductVariant } from "./product-store.ts";

export interface CartItem {
    productId: number;
    variantId: number;
    name: string;
    size: string;
    color: string;
    price: number;
    quantity: number;
    image?: string;
}

const STORAGE_KEY = "cart";

export class CartStore {
    items: CartItem[] = [];

    constructor() {
        makeAutoObservable(this);

        this.loadFromStorage();

        // ФЕЙКОВЫЕ ТОВАРЫ (если корзина пустая)
        if (this.items.length === 0) {
            this.items = [
                {
                    productId: 1,
                    variantId: 101,
                    name: "Худи Нижнекамск",
                    size: "S",
                    color: "Черный",
                    price: 5000,
                    quantity: 2,
                    image: "/images/cover.jpg",
                },
                {
                    productId: 1,
                    variantId: 102,
                    name: "Худи Нижнекамск",
                    size: "M",
                    color: "Черный",
                    price: 5000,
                    quantity: 1,
                    image: "/images/cover.jpg",
                },
            ];
            this.saveToStorage();
        }

        reaction(
            () => this.items.map((i) => ({ ...i })),
            () => this.saveToStorage()
        );
    }

    /* ===== ACTIONS ===== */

    addToCart(product: Product, variant: ProductVariant, quantity = 1) {
        const existing = this.items.find(
            (i) =>
                i.productId === product.id &&
                i.variantId === variant.id
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
            color: product.color.name,
            price: variant.price,
            quantity,
            image: product.media[0]?.url,
        });
    }

    increaseQuantity(variantId: number) {
        const item = this.items.find(
            (i) => i.variantId === variantId
        );
        if (item) item.quantity += 1;
    }

    decreaseQuantity(variantId: number) {
        const item = this.items.find(
            (i) => i.variantId === variantId
        );
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

    /* ===== COMPUTED ===== */

    get totalItemsCount() {
        return this.items.reduce(
            (sum, item) => sum + item.quantity,
            0
        );
    }

    get productsTotalPrice() {
        return this.items.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );
    }

    /* ===== STORAGE ===== */

    saveToStorage() {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(this.items)
        );
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
}
