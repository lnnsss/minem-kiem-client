import { makeAutoObservable, runInAction } from "mobx";
import type { AxiosResponse } from "axios";
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
    isPreorder: boolean;
}

/*----api-responses-------------------------------------------*/

interface ProductsResponse {
    count: number;
    next: string | null;
    results: {
        id: number;
        name: string;
        slug: string;
        price: string;
        images: string[];
        in_stock: boolean;
        is_preorder: boolean;
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
            categories: [item.group],
            isPreorder: item.is_preorder
        };
    }

    private async fetchAllProductPages(
        fetchPage: (page: number) => Promise<AxiosResponse<ProductsResponse>>
    ) {
        const products: ProductsResponse["results"] = [];
        let page = 1;

        while (true) {
            const { data } = await fetchPage(page);
            products.push(...data.results);

            if (!data.next || data.results.length === 0 || products.length >= data.count) {
                return products;
            }

            page += 1;
        }
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
            const products = await this.fetchAllProductPages((page) =>
                Api.getProducts(page)
            );

            runInAction(() => {
                this.items = products.map((item) =>
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
            const products = await this.fetchAllProductPages((page) =>
                Api.getProductsByCategory(slug, page)
            );

            runInAction(() => {
                this.items = products.map((item) =>
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
