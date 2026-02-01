import { makeAutoObservable } from "mobx";

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
    quantity = 1;

    constructor() {
        makeAutoObservable(this);

        // фейковый товар
        this.product = {
            id: 1,
            name: "Свитшот Байлык",
            slug: "sweatshirt-black-m",
            group: {
                id: 1,
                name: "Свитшот Байлык",
                slug: "sweatshirt-black-m",
                description:
                    "Худи изготавливается из 100% хлопка или премиального футера трехнитки, что обеспечивает мягкость, " +
                    "тактильность и долговечность — ткань не скатывается, не дает усадки и сохраняет цвет после стирок. \n" +
                    "\n" +
                    "Модель unisex с свободным кроем, капюшоном на шнуровке и карманом-кенгуру, доступна в черном цвете " +
                    "и размерах от S до XXL.  \n" +
                    "Материал обеспечивает отличную теплоизоляцию без утеплителя, подходит для активного отдыха " +
                    "или casual-образов. Хлопок дышит, впитывает влагу, а футер добавляет объем и уют, делая худи универсальным " +
                    "для зимы в татарстанском климате. Вышивка наносится машинным способом по фото или дизайну, устойчива к стирке",
                excerpt: "",
                materials: "",
                care_instructions: "",
                size_chart: "",
                delivery_info: "Отправим за 1-3 дня",
            },
            color: { id: 3, name: "Черный", slug: "black" },
            price: "4000.00",
            media: [
                {
                    url: "/images/cover.jpg",
                    type: "image",
                    position: 0,
                },
                {
                    url: "/images/cover2.jpg",
                    type: "image",
                    position: 1,
                },
            ],
            variants: [
                { id: 1, size: "S", sku: "sweatshirt-black-s", price: 4000, stock: 3, is_active: true },
                { id: 2, size: "M", sku: "sweatshirt-black-m", price: 4000, stock: 5, is_active: true },
                { id: 3, size: "L", sku: "sweatshirt-black-l", price: 4000, stock: 3, is_active: true },
                { id: 4, size: "XL", sku: "sweatshirt-black-xl", price: 4000, stock: 5, is_active: true },
            ],
            related_colors: [],
            categories: [{ id: 1, name: "Свитшоты", slug: "sweatshirts" }],
        };

        // по умолчанию первый активный вариант
        this.selectedVariantId = this.product.variants[0]?.id || null;
    }

    selectVariant(size: string) {
        if (!this.product) return;
        const variant = this.product.variants.find((v) => v.size === size && v.is_active && v.stock > 0);
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
        return this.product?.media.slice().sort((a, b) => a.position - b.position)[0]?.url;
    }

    get availableSizes() {
        if (!this.product) return [];
        return this.product.variants.filter((v) => v.is_active && v.stock > 0).map((v) => v.size);
    }
}
