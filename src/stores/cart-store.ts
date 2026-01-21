import { makeAutoObservable } from "mobx";
import type { RootStore } from "./root-store";

export interface CartItem {
    id: string | number;
    title: string;
    price: number;
    image?: string;
    quantity: number;
}

export class CartStore {
    root: RootStore;
    items: CartItem[] = [];

    constructor(root: RootStore) {
        makeAutoObservable(this);
        this.root = root;

        this.loadFromLocalStorage();
    }

    // ======= LOCAL STORAGE ======= //

    saveToLocalStorage() {
        localStorage.setItem("cart", JSON.stringify(this.items));
    }

    loadFromLocalStorage() {
        const data = localStorage.getItem("cart");
        if (data) {
            this.items = JSON.parse(data);
        }
    }

    // ======= CRUD ОПЕРАЦИИ ======= //

    addItem(product: { id: string | number; title: string; price: number; image?: string }) {
        const existing = this.items.find((item) => item.id === product.id);

        if (existing) {
            existing.quantity++;
        } else {
            this.items.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        this.saveToLocalStorage();
    }

    removeItem(id: string | number) {
        this.items = this.items.filter((item) => item.id !== id);
        this.saveToLocalStorage();
    }

    increase(id: string | number) {
        const item = this.items.find((i) => i.id === id);
        if (item) {
            item.quantity++;
            this.saveToLocalStorage();
        }
    }

    decrease(id: string | number) {
        const item = this.items.find((i) => i.id === id);
        if (!item) return;

        if (item.quantity === 1) {
            this.removeItem(id);
        } else {
            item.quantity--;
            this.saveToLocalStorage();
        }
    }

    clear() {
        this.items = [];
        this.saveToLocalStorage();
    }

    // ======= ВЫЧИСЛЕНИЯ ======= //

    get totalItems() {
        return this.items.reduce((acc, item) => acc + item.quantity, 0);
    }

    get totalPrice() {
        return this.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    }
}
