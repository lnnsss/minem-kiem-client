import s from "./Product.module.css";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../stores/use-stores";
import { Link, useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Arrow from "./components/Arrow";
import leftRnmnt from "./assets/images/leftRnmnt.png";
import rightRnmnt from "./assets/images/rightRnmnt.png";
import ArrowLeft from "./components/ArrowLeft";
import ArrowRight from "./components/ArrowRight";
import ProductImageModal from "./components/ProductImageModal";

const Product = observer(() => {
    const { slug } = useParams<{ slug: string }>();
    const { product: productStore, cart } = useStores();

    const product = productStore.product;
    const media = product?.media || [];

    const [activeIndex, setActiveIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (slug) {
            productStore.fetchProduct(slug);
        }
    }, [slug]);

    if (productStore.loading) return <div>Загрузка...</div>;
    if (!product) return <div>Товар не найден</div>;

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

    const handleAddToCart = () => {
        if (!productStore.currentVariant) return;
        cart.addToCart(product, productStore.currentVariant, 1);
    };

    return (
        <>
            <Header />

            <div className={s.product}>
                <img src={leftRnmnt} alt="" className={s.leftRnmnt} />
                <img src={rightRnmnt} alt="" className={s.rightRnmnt} />

                <div className={`__container ${s.product_container}`}>
                    <Link to="/shop" className={s.backBtn}>
                        <Arrow />
                        <span>Назад</span>
                    </Link>

                    <div className={s.product_images}>
                        <div className={s.slider_container}>
                            <button onClick={handlePrev} className={s.slider_arrow}>
                                <ArrowLeft />
                            </button>

                            <img
                                src={media[activeIndex]?.url || productStore.mainImage || ""}
                                alt={product.name}
                                className={s.product_cover}
                                onClick={() => handleImageClick(activeIndex)}
                            />

                            <button onClick={handleNext} className={s.slider_arrow}>
                                <ArrowRight />
                            </button>
                        </div>

                        <div className={s.product_covers}>
                            {media.map((m, idx) => (
                                <img
                                    key={m.position}
                                    src={m.url}
                                    className={`${s.product_covers_item} ${
                                        activeIndex === idx ? s.product_covers_item_active : ""
                                    }`}
                                    onClick={() => handleCoverClick(m.url)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className={s.product_info}>
                        <h2>{product.name}</h2>

                        <span className={s.product_info_price}>
                            {productStore.currentVariant?.price ?? product.price} ₽
                        </span>

                        <div className={s.product_info_size}>
                            <span>Размер</span>

                            <div className={s.size_btns}>
                                {productStore.availableSizes.map((v) => (
                                    <button
                                        key={v.size}
                                        className={`${s.size_btn} ${
                                            productStore.currentVariant?.size === v.size ? s.size_btn_active : ""
                                        } ${v.stock === 0 ? s.size_btn_disabled : ""}`} // добавляем класс для заблокированных
                                        onClick={() => productStore.selectVariant(v.size)}
                                        disabled={v.stock === 0}
                                    >
                                        {v.size}
                                    </button>
                                ))}
                            </div>

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
