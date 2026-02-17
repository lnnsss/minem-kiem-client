export const ENDPOINTS = {
    PRODUCTS: "/products",
    PRODUCT: (slug: string | number) => `/products/${slug}`,

    PRODUCT_CATEGORIES: "/products/categories",
    PRODUCTS_BY_CATEGORY: (slug: string) =>
        `/products/categories/${slug}`,
};
