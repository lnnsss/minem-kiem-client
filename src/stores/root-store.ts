import { ModalStore } from "./modal-store";
import {CartStore} from "./cart-store.ts";

export class RootStore {
    modal = new ModalStore(this);
    cart = new CartStore(this);
}

export const rootStore = new RootStore();
