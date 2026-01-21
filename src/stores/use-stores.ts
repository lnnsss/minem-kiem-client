import { useContext } from "react";
import { RootStoreContext } from "./root-store-context";

export const useStores = () => {
    const store = useContext(RootStoreContext);
    if (!store) throw new Error("RootStoreProvider missing!");
    return store;
};
