import { makeAutoObservable, runInAction } from "mobx";
import { Api } from "../api/api-helpers.ts";

/* ======= TYPES ======= */
export interface ProductVariant {
    id: number;
    size: string;
    sku: string;
    price: number;
    stock: number;
    is_active: boolean;
}

export interface ProductMedia {
    url: string;
    type: "image";
    position: number;
}

export interface ProductColor {
    id: number;
    name: string;
    slug: string;
}

export interface ProductGroup {
    id: number;
    name: string;
    slug: string;
    description: string;
    excerpt: string;
    materials: string;
    care_instructions: string;
    size_chart: string;
    delivery_info: string;
}

export interface ProductCategory {
    id: number;
    name: string;
    slug: string;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    group: ProductGroup;
    color: ProductColor;
    price: string;
    media: ProductMedia[];
    variants: ProductVariant[];
    related_colors: ProductColor[];
    categories: ProductCategory[];
}

/* ======= STORE ======= */
export class ProductStore {
    product: Product | null = null;
    selectedVariantId: number | null = null;
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchProduct(slug: string) {
        this.loading = true;
        try {
            const { data } = await Api.getProduct(slug);
            runInAction(() => {
                this.product = data;

                const firstActiveVariant =
                    data.variants.find(
                        (v: ProductVariant) => v.is_active && v.stock > 0
                    ) || null;

                this.selectedVariantId = firstActiveVariant?.id ?? null;
            });
        } catch (e) {
            console.error("Ошибка загрузки товара", e);
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    selectVariant(size: string) {
        if (!this.product) return;

        const variant = this.product.variants.find(
            (v) => v.size === size && v.is_active && v.stock > 0
        );

        if (variant) this.selectedVariantId = variant.id;
    }

    get currentVariant() {
        if (!this.product || this.selectedVariantId === null) return null;
        return this.product.variants.find((v) => v.id === this.selectedVariantId) || null;
    }

    get isInStock() {
        const variant = this.currentVariant;
        return !!variant && variant.stock > 0 && variant.is_active;
    }

    get mainImage() {
        return this.product?.media
            .slice()
            .sort((a, b) => a.position - b.position)[0]?.url;
    }

    get availableSizes() {
        if (!this.product) return [];

        const order = ["S", "M", "L", "XL"];
        return this.product.variants
            .map((v) => ({
                size: v.size,
                stock: v.stock,
                isActive: v.is_active,
            }))
            .sort((a, b) => order.indexOf(a.size) - order.indexOf(b.size));
    }

    isSizeAvailable(size: string) {
        if (!this.product) return false;
        const variant = this.product.variants.find((v) => v.size === size && v.is_active);
        return !!variant && variant.stock > 0;
    }
}
