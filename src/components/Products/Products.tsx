import s from "./Products.module.css";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../stores/use-stores";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ProductsItem from "./components/ProductsItem";
import ProductsFilter from "./components/ProductsFilter";
import leftRnmnt from "./assets/images/rnmntLeft.png";
import rightRnmnt from "./assets/images/rnmntRight.png";

const Products = observer(() => {
    const { catalog } = useStores();
    const [activeCategory, setActiveCategory] = useState("all");

    useEffect(() => {
        catalog.fetchCategories();
        catalog.fetchProducts();
    }, [catalog]);

    const handleCategoryChange = (slug) => {
        setActiveCategory(slug);

        if (slug === "all") {
            catalog.fetchProducts();
        } else {
            catalog.fetchProductsByCategory(slug);
        }
    };

    const isEmpty = catalog.items.length === 0;

    return (
        <>
            <Header theme="white" />

            <div className={s.products}>
                <img src={leftRnmnt} alt="left ornament" className={s.leftRnmnt} />
                <img src={rightRnmnt} alt="right ornament" className={s.rightRnmnt} />

                <div className={s.products_cover}>
                    <h2>Каталог</h2>
                    <a href="#productsHeader" className={s.downBtn}>
                        <svg width="40" height="40" viewBox="0 0 127 127" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3.5" y="3.5" width="120" height="120" rx="60" stroke="white" stroke-width="7"/>
                            <path d="M67 33.5C67 31.567 65.433 30 63.5 30C61.567 30 60 31.567 60 33.5L63.5 33.5L67 33.5ZM61.0251 95.9749C62.392 97.3417 64.608 97.3417 65.9749 95.9749L88.2487 73.701C89.6156 72.3342 89.6156 70.1181 88.2487 68.7513C86.8819 67.3844 84.6658 67.3844 83.299 68.7513L63.5 88.5503L43.701 68.7513C42.3342 67.3844 40.1181 67.3844 38.7513 68.7513C37.3844 70.1181 37.3844 72.3342 38.7513 73.701L61.0251 95.9749ZM63.5 33.5L60 33.5L60 93.5L63.5 93.5L67 93.5L67 33.5L63.5 33.5Z" fill="white"/>
                        </svg>
                    </a>
                </div>

                <div className={`__container ${s.products_container}`}>
                    <div className={s.products_header} id="productsHeader">
                        <ul className={s.products_filters}>
                            <ProductsFilter
                                title="Все"
                                isActive={activeCategory === "all"}
                                onClick={() => handleCategoryChange("all")}
                            />

                            {catalog.categories.map((cat) => (
                                <ProductsFilter
                                    key={cat.id}
                                    title={cat.name}
                                    isActive={activeCategory === cat.slug}
                                    onClick={() => handleCategoryChange(cat.slug)}
                                />
                            ))}
                        </ul>
                    </div>

                    {isEmpty ? (
                        <div className={s.products_empty}>
                            <p className={s.pusto}>Каталог пуст</p>
                        </div>
                    ) : (
                        <div className={s.products_grid}>
                            {catalog.items.map((item) => {
                                const images = item.images ?? [];

                                return (
                                    <ProductsItem
                                        key={item.id}
                                        slug={item.slug}
                                        title={item.name}
                                        price={Number(item.price)}
                                        image={images[0]}
                                        hoverImage={images[1]}
                                        inStock={catalog.hasStock(item)}
                                        isPreorder={item.isPreorder}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
});

export default Products;
