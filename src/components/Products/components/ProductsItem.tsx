import s from "../Products.module.css"
import {Link} from "react-router-dom";

interface ProductsItemProps {
    slug: string;
    image: string;
    hoverImage?: string;
    title: string;
    price: number;
    inStock?: boolean;
}

const ProductsItem = ({ slug, image, hoverImage, title, price, inStock = true }: ProductsItemProps)  => {
    const hasHover = Boolean(hoverImage) && inStock;

    return (
        <div className={`${s.products_item} ${!inStock ? s.products_item_disabled : ""}`}>
            {inStock ? (
                <Link to={`/shop/${slug}`} className={s.products_item_link}>
                    {hasHover ? (
                        <div className={s.products_item_image_wrapper}>
                            <img src={image} alt={title} className={s.products_item_image_main} />
                            <img src={hoverImage} alt={title} className={s.products_item_image_hover} />
                        </div>
                    ) : (
                        <img src={image} alt={title} className={s.products_item_image_main_single} />
                    )}
                </Link>
            ) : (
                <img src={image} alt={title} className={s.products_item_image_main_single} />
            )}

            <div className={s.products_item_text}>
                <h4 className={s.products_item_title}>{title}</h4>
                <span className={s.products_item_price}>{price} ₽</span>
                {!inStock && (
                    <span className={s.products_item_inStock}>Нет в наличии</span>
                )}
            </div>
        </div>
    );
}

export default ProductsItem;