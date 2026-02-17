import { api } from "./axios-client";
import { ENDPOINTS } from "./endpoints";

export const Api = {
    getProducts: () => api.get(ENDPOINTS.PRODUCTS),

    getProduct: (slug: string | number) => api.get(ENDPOINTS.PRODUCT(slug)),

    getProductsByCategory: (slug: string) =>
        api.get(ENDPOINTS.PRODUCTS_BY_CATEGORY(slug)),

    getProductCategories: () => api.get(ENDPOINTS.PRODUCT_CATEGORIES),

    sendContact: (data: { name: string; email: string; message: string }) =>
        api.post(ENDPOINTS.CONTACTS, data),
};
