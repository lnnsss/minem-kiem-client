import { makeAutoObservable } from "mobx";
import type { RootStore } from "./root-store";

/* ======= TYPES ======= */

export interface ProductVariant {
    id: number;
    size: string;
    sku: string;
    price: number;
    stock: number;
    is_active: boolean;
}

export interface ProductCategory {
    id: number;
    name: string;
    slug: string;
}

export interface ProductMedia {
    url: string;
    type: "image";
    position: number;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    price: string;
    media: ProductMedia[];
    variants: ProductVariant[];
    categories: ProductCategory[];
}

/* ======= STORE ======= */

export class CatalogStore {
    root: RootStore;
    items: Product[] = [];

    constructor(root: RootStore) {
        makeAutoObservable(this);
        this.root = root;

        this.seedFakeProducts();
    }

    /* ======= FAKE DATA ======= */

    seedFakeProducts() {
        const products: Product[] = Array.from({ length: 10 }).map((_, i) => {
            const inStock = i % 3 !== 0;

            return {
                id: i + 1,
                name: "Свитшот",
                slug: `sweatshirt-black-${i + 1}`,
                price: "4000.00",
                media: [
                    {
                        url: "/images/cover.jpg",
                        type: "image",
                        position: 0
                    },
                    {
                        url: "/images/cover2.jpg",
                        type: "image",
                        position: 1
                    }
                ],
                variants: [
                    {
                        id: i + 1,
                        size: "M",
                        sku: `sweatshirt-black-${i + 1}-m`,
                        price: 4000,
                        stock: inStock ? 5 : 0,
                        is_active: true
                    }
                ],
                categories: [
                    {
                        id: 1,
                        name: "Свитшоты",
                        slug: "sweatshirts"
                    }
                ]
            };
        });

        this.items = products;
    }

    /* ======= HELPERS ======= */

    hasStock(product: Product) {
        return product.variants.some(
            (v) => v.is_active && v.stock > 0
        );
    }

    mainImage(product: Product) {
        return product.media
            .slice()
            .sort((a, b) => a.position - b.position)[0]?.url;
    }

    /* ======= GETTERS ======= */

    get inStockItems() {
        return this.items.filter((item) => this.hasStock(item));
    }

    getBySlug(slug: string) {
        return this.items.find((item) => item.slug === slug);
    }

    getByCategory(categorySlug: string) {
        if (categorySlug === "all" || categorySlug === "Все") {
            return this.items;
        }

        return this.items.filter((item) =>
            item.categories.some((c) => c.slug === categorySlug)
        );
    }

    get categories() {
        const map = new Map<number, ProductCategory>();

        this.items.forEach((item) => {
            item.categories.forEach((cat) => {
                map.set(cat.id, cat);
            });
        });

        return Array.from(map.values());
    }

    /* ======= COMPUTED ======= */

    get totalItems() {
        return this.items.length;
    }

    get totalInStock() {
        return this.inStockItems.length;
    }
}
