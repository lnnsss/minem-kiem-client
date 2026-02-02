import { makeAutoObservable } from "mobx";
import type { RootStore } from "./root-store";

export class ModalStore {
    root: RootStore;
    editingModalActive = false;

    constructor(root: RootStore) {
        makeAutoObservable(this);
        this.root = root;
    }

    setEditingModalActive = (state: boolean) => {
        this.editingModalActive = state;
    };
}

