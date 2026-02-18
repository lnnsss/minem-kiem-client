import { useState, useEffect } from 'react';
import s from "../Main.module.css";
import logo from '../assets/images/logo.png';
import { Link } from "react-router-dom";
import cartIcon from "../assets/images/cart.png";
import {useStores} from "../../../stores/use-stores.ts";
import {observer} from "mobx-react-lite";

const Hero = observer(() => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { modal, cart } = useStores();

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const mobileBreakpoint = 740;
            const desktopBreakpoint = 900;
            const breakpoint = window.innerWidth <= 768 ? mobileBreakpoint : desktopBreakpoint;
            setIsScrolled(scrollY >= breakpoint);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const closeMenu = () => setIsMenuOpen(false);
    const cartCounter = cart.totalItemsCount;

    return (
        <section className={s.hero}>
            <div className={`__container ${s.hero_container}`}>

                <header className={`${s.hero_header} ${isScrolled ? s.headerScrolled : ''}`}>
                    <Link to="/" onClick={closeMenu}>
                        <img src={logo} alt="Минем Кием" className={s.header_logo} />
                    </Link>

                    <nav className={s.header_nav}>
                        <ul className={s.header_ul}>
                            <li className={s.header_li}><Link to="/" className={s.header_link}>Главная</Link></li>
                            <li className={s.header_li}><Link to="/shop" className={s.header_link}>Каталог</Link></li>
                            <li className={s.header_li}><Link to="/contacts" className={s.header_link}>Контакты</Link></li>
                        </ul>

                        <button className={s.cart} onClick={() => modal.setEditingModalActive(true)}>
                            <span className={s.cartCounter}>{cartCounter || ''}</span>
                            <img src={cartIcon} alt="Корзина" />
                        </button>
                    </nav>

                    <div className={s.burgerWithCart}>
                        <button className={s.cart_mobile} onClick={() => modal.setEditingModalActive(true)}>
                            <span className={s.cartCounter}>{cartCounter || ''}</span>
                            <img src={cartIcon} alt="Корзина" />
                        </button>

                        <button
                            className={`${s.header_burger} ${isMenuOpen ? s.header_burger_active : ''}`}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Меню"
                        >
                            <span className={s.header_burger_line}></span>
                            <span className={s.header_burger_line}></span>
                            <span className={s.header_burger_line}></span>
                        </button>
                    </div>
                </header>

                {/* МОБИЛЬНОЕ ВЫПАДАЮЩЕЕ МЕНЮ */}
                <div className={`${s.mobileMenu} ${isMenuOpen ? s.mobileMenu_open : ''}`}>
                    <ul className={s.mobileMenu_list}>
                        <li><Link to="/" onClick={closeMenu}>Главная</Link></li>
                        <li><Link to="/shop" onClick={closeMenu}>Каталог</Link></li>
                        <li><Link to="/contacts" onClick={closeMenu}>Контакты</Link></li>
                    </ul>
                </div>

                <div className={s.hero_text}>
                    <h1>Минем Кием</h1>
                    <h3>
                        Бренд одежды родом из Республики Татарстан.<br />
                        Миссия — сохранить и популяризировать Татарскую Культуру
                    </h3>
                </div>
            </div>
        </section>
    );
})

export default Hero