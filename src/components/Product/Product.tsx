import s from "./Product.module.css";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../stores/use-stores.ts";
import { Link } from "react-router-dom";
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";
import Arrow from "./components/Arrow.tsx";
import leftRnmnt from "./assets/images/leftRnmnt.png";
import rightRnmnt from "./assets/images/rightRnmnt.png";
import ArrowLeft from "./components/ArrowLeft.tsx";
import ArrowRight from "./components/ArrowRight.tsx";
import ProductImageModal from "./components/ProductImageModal.tsx";

const Product = observer(() => {
    const { product: productStore, cart } = useStores();
    const product = productStore.product;
    const media = product?.media || [];

    const [activeIndex, setActiveIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!product) return null;

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
    };

    const handleCoverClick = (url: string) => {
        const index = media.findIndex((m) => m.url === url);
        setActiveIndex(index);
    };

    const handleImageClick = (index: number) => {
        setActiveIndex(index);
        setIsModalOpen(true);
    };

    // ✅ Добавление в корзину
    const handleAddToCart = () => {
        if (!productStore.currentVariant) return;

        cart.addToCart(
            product,
            productStore.currentVariant,
            1
        );
    };

    return (
        <>
            <Header />

            <div className={s.product}>
                {/* Декорации только для ПК ≥1440px */}
                <img src={leftRnmnt} alt="leftRnmnt" className={s.leftRnmnt} />
                <img src={rightRnmnt} alt="rightRnmnt" className={s.rightRnmnt} />

                <div className={`__container ${s.product_container}`}>
                    <Link to="/shop" className={s.backBtn}>
                        <Arrow />
                        <span>Назад</span>
                    </Link>

                    {/* Изображения продукта */}
                    <div className={s.product_images}>
                        <div className={s.slider_container}>
                            <button className={s.slider_arrow} onClick={handlePrev}>
                                <ArrowLeft />
                            </button>
                            <img
                                src={media[activeIndex]?.url || productStore.mainImage || ""}
                                alt={product.name}
                                className={s.product_cover}
                                onClick={() => handleImageClick(activeIndex)}
                            />
                            <button className={s.slider_arrow} onClick={handleNext}>
                                <ArrowRight />
                            </button>
                        </div>

                        <div className={s.product_covers}>
                            {media.map((m, idx) => (
                                <img
                                    key={m.position}
                                    src={m.url}
                                    alt={`media-${m.position}`}
                                    className={`${s.product_covers_item} ${
                                        activeIndex === idx ? s.product_covers_item_active : ""
                                    }`}
                                    onClick={() => handleCoverClick(m.url)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Информация о продукте */}
                    <div className={s.product_info}>
                        <h2 className={s.product_info_title}>{product.name}</h2>
                        <span className={s.product_info_price}>
                            {productStore.currentVariant?.price ?? product.price} руб
                        </span>

                        <div className={s.product_info_size}>
                            <span>Размер</span>
                            <div className={s.size_btns}>
                                {productStore.availableSizes.map((size) => (
                                    <button
                                        key={size}
                                        className={`${s.size_btn} ${
                                            productStore.currentVariant?.size === size ? s.size_btn_active : ""
                                        }`}
                                        onClick={() => productStore.selectVariant(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>

                            {/* ✅ Кнопка добавления в корзину */}
                            <button
                                className={s.product_info_buyBtn}
                                disabled={!productStore.isInStock}
                                onClick={handleAddToCart}
                            >
                                В корзину
                            </button>
                        </div>

                        <p className={s.product_info_description}>
                            {product.group.description}
                        </p>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <ProductImageModal
                    images={media.map((m) => m.url)}
                    initialIndex={activeIndex}
                    onClose={() => setIsModalOpen(false)}
                />
            )}

            <Footer />
        </>
    );
});

export default Product;
