import s from "./Products.module.css";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../../stores/use-stores.ts";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ProductsItem from "./components/ProductsItem.tsx";
import leftRnmnt from "./assets/images/rnmntLeft.png";
import rightRnmnt from "./assets/images/rnmntRight.png";
import ProductsFilter from "./components/ProductsFilter.tsx";

const Products = observer(() => {
    const { catalog } = useStores();
    const [activeCategory, setActiveCategory] = useState("all");

    const products =
        activeCategory === "all"
            ? catalog.items
            : catalog.getByCategory(activeCategory);

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
                                onClick={() => setActiveCategory("all")}
                            />

                            {catalog.categories.map((cat) => (
                                <ProductsFilter
                                    key={cat.id}
                                    title={cat.name}
                                    isActive={activeCategory === cat.slug}
                                    onClick={() => setActiveCategory(cat.slug)}
                                />
                            ))}
                        </ul>
                    </div>

                    <div className={s.products_grid}>
                        {products.map((item) => {
                            const sortedMedia = item.media.slice().sort((a, b) => a.position - b.position);
                            return (
                                <ProductsItem
                                    key={item.id}
                                    slug={item.slug}
                                    title={item.name}
                                    price={Number(item.price)}
                                    image={sortedMedia[0]?.url}
                                    hoverImage={sortedMedia[1]?.url}
                                    inStock={catalog.hasStock(item)}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
});

export default Products;
