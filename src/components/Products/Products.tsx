import s from "./Products.module.css"
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";
import rnmntLeft from './assets/images/rnmntLeft.png';
import rnmntRight from './assets/images/rnmntRight.png';
import cover from "./assets/images/cover.jpg";

interface ProductsFilterProps {
    title: string;
    isActive?: boolean;
}
interface ProductsItemProps {
    image: string;
    title: string;
    price: number;
    inStock?: boolean;
}

function ProductsFilter({ title, isActive }: ProductsFilterProps) {
    return (
        <li className={`${s.products_filter} ${isActive && s.products_filter_active}`}>
            <button>{title}</button>
        </li>
    )
}

function ProductsItem({ image, title, price, inStock=true }: ProductsItemProps) {

    return (
        <div className={s.products_item}>
            <img src={image} alt="cover" className={s.products_item_image} />
            <div className={s.products_item_text}>
                <h4 className={s.products_item_title}>{title}</h4>
                <span className={s.products_item_price}>{price}</span>
                {!inStock && <span className={s.products_item_inStock}>Нет в наличии</span>}
            </div>
        </div>
    )
}

export default function Products() {

    return (
        <>
            <Header theme="white" />
            <div className={s.products}>
                <img src={rnmntLeft} alt="rnmntLeft" className={s.rnmntLeft}/>
                <img src={rnmntRight} alt="rnmntRight" className={s.rnmntRight}/>

                <div className={s.products_cover}>
                    <h2>Каталог</h2>
                </div>
                <div className={`__container ${s.products_container}`}>
                    <div className={s.products_header}>
                        <ul className={s.products_filters}>
                            <ProductsFilter title="Все" isActive={true} />
                            <ProductsFilter title="Футболки" />
                            <ProductsFilter title="Лонгсливы" />
                            <ProductsFilter title="Свитшоты" />
                            <ProductsFilter title="Худи" />
                            <ProductsFilter title="Аксессуары" />
                        </ul>
                    </div>
                    <div className={s.products_grid}>
                        <ProductsItem image={cover} title={"Свитшот"} price={4000}/>
                        <ProductsItem image={cover} title={"Свитшот"} price={4000} inStock={false}/>
                        <ProductsItem image={cover} title={"Свитшот"} price={4000}/>
                        <ProductsItem image={cover} title={"Свитшот"} price={4000}/>
                        <ProductsItem image={cover} title={"Свитшот"} price={4000}/>
                        <ProductsItem image={cover} title={"Свитшот"} price={4000}/>
                        <ProductsItem image={cover} title={"Свитшот"} price={4000}/>
                        <ProductsItem image={cover} title={"Свитшот"} price={4000}/>
                        <ProductsItem image={cover} title={"Свитшот"} price={4000}/>
                        <ProductsItem image={cover} title={"Свитшот"} price={4000}/>
                        <ProductsItem image={cover} title={"Свитшот"} price={4000}/>
                        <ProductsItem image={cover} title={"Свитшот"} price={4000}/>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
