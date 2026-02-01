import { ModalStore } from "./modal-store";
import { CartStore } from "./cart-store";
import { CatalogStore } from "./catalog-store";
import { ProductStore } from "./product-store";

export class RootStore {
    modal = new ModalStore(this);
    cart = new CartStore(this);
    catalog = new CatalogStore(this);
    product = new ProductStore(); // больше не передаем this
}

export const rootStore = new RootStore();
