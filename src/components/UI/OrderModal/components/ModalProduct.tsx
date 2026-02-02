import s from "../OrderModal.module.css";
import {observer} from "mobx-react-lite";
import {useStores} from "../../../../stores/use-stores.ts";
import {Link} from "react-router-dom";
import MinusIcon from "./MinusIcon.tsx";
import PlusIcon from "./PlusIcon.tsx";
import DeleteIcon from "./DeleteIcon.tsx";

interface ModalProductProps {
    slug: string;
    image: string;
    title: string;
    size: string;
    count: number;
    price: number;
}

const ModalProduct = observer(({slug, image, title, size, count, price}: ModalProductProps) => {
    const { modal } = useStores();

    if (!modal.editingModalActive) return null;

    return (
        <div className={s.modal_product}>
            <div className={s.modal_product_info}>
                <Link to={`/shop/${slug}`}>
                    <img
                        src={image} alt="Облога"
                        className={s.modal_product_cover}
                        onClick={() => modal.setEditingModalActive(false)} />
                </Link>
                <div className={s.modal_product_text}>
                    <Link to={`/shop/${slug}`}>
                        <h3 onClick={() => modal.setEditingModalActive(false)}>{title}</h3>
                    </Link>
                    <h4>Размер: {size}</h4>
                </div>
            </div>
            <div className={s.modal_product_total}>
                <div className={s.modal_product_count}>
                    <button><MinusIcon/></button>
                    <span className={s.modal_product_count_num}>{count}</span>
                    <button><PlusIcon/></button>
                </div>
                <div className={s.modal_product_sum}>
                    <h5 className={s.modal_product_price}>{price * count} руб</h5>
                    <button><DeleteIcon/></button>
                </div>
            </div>
        </div>
    )
})

export default ModalProduct;