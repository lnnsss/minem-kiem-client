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
                </div>

                <div className={`__container ${s.products_container}`}>
                    <div className={s.products_header}>
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
