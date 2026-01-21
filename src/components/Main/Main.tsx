import { useEffect } from "react";
import { useStores } from "../../stores/use-stores";
import styles from "./Main.module.css";

export default function Main() {
    const {
        modal: { setEditingModalActive }
    } = useStores();

    useEffect(() => {
        console.log("Main mounted");
    }, []);

    return (
        <div className={styles.wrapper}>
            <button onClick={() => setEditingModalActive(true)}>
                Открыть модалку
            </button>
        </div>
    );
}
