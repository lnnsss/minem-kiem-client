import { api } from "./axios-client";
import { ENDPOINTS } from "./endpoints";

export const Api = {
    getProducts: () => api.get(ENDPOINTS.PRODUCTS),
    getProduct: (id: string | number) => api.get(ENDPOINTS.PRODUCT(id))
};
