import s from "../Products.module.css";

interface ProductsFilterProps {
    title: string;
    isActive?: boolean;
    onClick?: () => void;
}

const ProductsFilter = ({ title, isActive, onClick }: ProductsFilterProps)=> {
    return (
        <li
            className={`${s.products_filter} ${isActive ? s.products_filter_active : ""}`}
        >
            <button onClick={onClick}>{title}</button>
        </li>
    );
}

export default ProductsFilter;