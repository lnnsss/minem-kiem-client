import { makeAutoObservable, runInAction } from "mobx";
import type { RootStore } from "./root-store";
import { Api } from "../api/api-helpers";

/*----types-------------------------------------------*/

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

export interface Product {
    id: number;
    name: string;
    slug: string;
    price: string;
    images: string[];
    variants: ProductVariant[];
    categories: ProductCategory[];
}

/*----api-responses-------------------------------------------*/

interface ProductsResponse {
    results: {
        id: number;
        name: string;
        slug: string;
        price: string;
        images: string[];
        in_stock: boolean;
        group: ProductCategory;
    }[];
}

interface CategoriesResponse {
    results: ProductCategory[];
}

/*----store-------------------------------------------*/

export class CatalogStore {
    root: RootStore;

    items: Product[] = [];
    categories: ProductCategory[] = [];
    isLoading = false;

    constructor(root: RootStore) {
        makeAutoObservable(this);
        this.root = root;
    }

    /*----mapper-------------------------------------------*/

    private mapProduct(
        item: ProductsResponse["results"][number]
    ): Product {
        return {
            id: item.id,
            name: item.name,
            slug: item.slug,
            price: item.price,
            images: item.images ?? [],
            variants: [
                {
                    id: item.id,
                    size: "default",
                    sku: item.slug,
                    price: Number(item.price),
                    stock: item.in_stock ? 1 : 0,
                    is_active: true
                }
            ],
            categories: [item.group]
        };
    }

    /*----api-------------------------------------------*/

    async fetchCategories() {
        try {
            const { data } = await Api.getProductCategories();

            runInAction(() => {
                this.categories = (data as CategoriesResponse).results;
            });
        } catch (e) {
            console.error("fetchCategories error", e);
        }
    }

    async fetchProducts() {
        this.isLoading = true;

        try {
            const { data } = await Api.getProducts();

            runInAction(() => {
                this.items = (data as ProductsResponse).results.map((item) =>
                    this.mapProduct(item)
                );
            });
        } catch (e) {
            console.error("fetchProducts error", e);
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async fetchProductsByCategory(slug: string) {
        this.isLoading = true;

        try {
            const { data } = await Api.getProductsByCategory(slug);

            runInAction(() => {
                this.items = (data as ProductsResponse).results.map((item) =>
                    this.mapProduct(item)
                );
            });
        } catch (e) {
            console.error("fetchProductsByCategory error", e);
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    /*----helpers-------------------------------------------*/

    hasStock(product: Product) {
        return product.variants.some(
            (v) => v.is_active && v.stock > 0
        );
    }

    getBySlug(slug: string) {
        return this.items.find((item) => item.slug === slug);
    }
}
