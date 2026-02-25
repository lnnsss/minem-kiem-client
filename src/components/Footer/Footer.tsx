import logo from './assets/images/logo.png';
import s from "./Footer.module.css";
import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <footer className={s.footer}>
            <div className={`__container ${s.footer_container}`}>
                <div className={s.footer_left}>
                    <a
                        href="index.html"
                        className={`${s.footer_logo} ${s.footer_logo_desktop}`}
                    >
                        <img
                            src={logo}
                            alt="Минем Кием"
                            className={`${s.footer_logo} ${s.footer_logo_desktop}`}
                        />
                    </a>
                    <span>© 2026 Минем Кием.</span>
                </div>

                <div className={s.footer_right}>
                    {/*<ul className={s.footer_ul}>*/}
                    {/*    <h5>Информация</h5>*/}
                    {/*    <li className={s.footer_li}>*/}
                    {/*        <a href="#advantages" className={s.footer_link}>Преимущества</a>*/}
                    {/*    </li>*/}
                    {/*    <li className={s.footer_li}>*/}
                    {/*        <a href="#team" className={s.footer_link}>Команда</a>*/}
                    {/*    </li>*/}
                    {/*    <li className={s.footer_li}>*/}
                    {/*        <a href="#reviews" className={s.footer_link}>Отзывы</a>*/}
                    {/*    </li>*/}
                    {/*</ul>*/}

                    <ul className={s.footer_ul}>
                        <h5>Соц. сети</h5>
                        <li className={s.footer_li}>
                            <a href="https://t.me/minemkiem" className={s.footer_link}>Телеграм</a>
                        </li>
                        <li className={s.footer_li}>
                            <a href="https://www.instagram.com/minem.kiem" className={s.footer_link}>Инстаграм</a>
                        </li>
                        <li className={s.footer_li}>
                            <a href="https://vk.com/minem.kiem?" className={s.footer_link}>Вконтакте</a>
                        </li>
                    </ul>

                    <ul className={s.footer_ul}>
                        <h5>Контакты</h5>
                        <li className={s.footer_li}>
                            <a href="tel:89951333051" className={s.footer_link}>+7 995 133-30-51</a>
                        </li>
                        <li className={s.footer_li}>
                            <a href="mailto:minem.kiem@gmail.com" className={s.footer_link}>minem.kiem@gmail.com</a>
                        </li>
                        <li className={s.footer_li}>
                            Казань, ул. Губкина 15
                        </li>
                    </ul>

                    <ul className={s.footer_ul}>
                        <h5>Документы</h5>
                        <li className={s.footer_li}>
                            <Link to={"/agreement"} className={s.footer_link}>Пользовательское Соглашение</Link>
                        </li>
                        <li className={s.footer_li}>
                            <Link to={"/politics"} className={s.footer_link}>Политика обработки персональных данных</Link>
                        </li>
                        <li className={s.footer_li}>
                            <Link to={"/oferta"} className={s.footer_link}>Публичная оферта</Link>
                        </li>
                    </ul>
                </div>

                <a
                    href="index.html"
                    className={`${s.footer_logo} ${s.footer_logo_mobile}`}
                >
                    <img
                        src={logo}
                        alt="Минем Кием"
                        className={`${s.footer_logo} ${s.footer_logo_mobile}`}
                    />
                </a>
            </div>
        </footer>
    );
}

