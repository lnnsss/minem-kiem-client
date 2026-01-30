import s from "./Header.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./components/Logo";
import CartIcon from "./components/CartIcon";

type HeaderProps = {
    theme?: "green" | "white";
};

export default function Header({ theme = "green" }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartCounter] = useState(0);
    const [logoWidth, setLogoWidth] = useState(230);

    const isWhite = theme === "white";
    const iconColor = isWhite ? "black" : "white";

    useEffect(() => {
        const media = window.matchMedia("(max-width: 1124px)");

        const handleResize = () => {
            setLogoWidth(media.matches ? 153 : 230);
        };

        handleResize();
        media.addEventListener("change", handleResize);

        return () => media.removeEventListener("change", handleResize);
    }, []);

    return (
        <header
            className={`${s.header} ${
                isWhite ? s.header_white : s.header_green
            }`}
        >
            <div className={`__container ${s.header_container}`}>
                <Link to="/">
                    <Logo
                        width={logoWidth}
                        color={iconColor}
                    />
                </Link>

                <div className={s.navWithCart}>
                    <nav>
                        <ul className={s.header_ul}>
                            <li><Link to="/" className={s.header_link}>Главная</Link></li>
                            <li><Link to="/shop" className={s.header_link}>Каталог</Link></li>
                            <li><Link to="/contacts" className={s.header_link}>Контакты</Link></li>
                        </ul>
                    </nav>

                    <div className={s.cartWithBurger}>
                        <button className={s.cart}>
                            <span className={s.cartCounter}>{cartCounter || ""}</span>
                            <CartIcon color={iconColor} />
                        </button>

                        <button
                            className={s.header_burger}
                            onClick={() => setIsMenuOpen(prev => !prev)}
                            aria-label="Меню"
                        >
                            <span className={s.header_burger_line}></span>
                            <span className={s.header_burger_line}></span>
                            <span className={s.header_burger_line}></span>
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE MENU */}
            <div
                className={`${s.mobileMenu} ${
                    isMenuOpen ? s.mobileMenu_open : ""
                } ${isWhite ? s.mobileMenu_white : s.mobileMenu_green}`}
            >
                <ul className={s.mobileMenu_list}>
                    <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Главная</Link></li>
                    <li><Link to="/shop" onClick={() => setIsMenuOpen(false)}>Каталог</Link></li>
                    <li><Link to="/contacts" onClick={() => setIsMenuOpen(false)}>Контакты</Link></li>
                </ul>
            </div>
        </header>
    );
}
