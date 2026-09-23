import { api } from "./axios-client";
import { ENDPOINTS } from "./endpoints";

export const Api = {
    getProducts: (page = 1) =>
        api.get(ENDPOINTS.PRODUCTS, { params: { page } }),

    getProduct: (slug: string | number) =>
        api.get(ENDPOINTS.PRODUCT(slug)),

    getProductsByCategory: (slug: string, page = 1) =>
        api.get(ENDPOINTS.PRODUCTS_BY_CATEGORY(slug), { params: { page } }),

    getProductCategories: () =>
        api.get(ENDPOINTS.PRODUCT_CATEGORIES),

    sendContact: (data: { name: string; email: string; message: string }) =>
        api.post(ENDPOINTS.CONTACTS, data),

    getOrder: (id: string) =>
        api.get(ENDPOINTS.ORDER(id)),
};
