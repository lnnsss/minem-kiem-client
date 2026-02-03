import { ModalStore } from "./modal-store";
import { CatalogStore } from "./catalog-store";
import { ProductStore } from "./product-store";
import { CartStore } from "./cart-store";

export class RootStore {
    modal = new ModalStore(this);
    catalog = new CatalogStore(this);
    product = new ProductStore();
    cart = new CartStore();
}

export const rootStore = new RootStore();
