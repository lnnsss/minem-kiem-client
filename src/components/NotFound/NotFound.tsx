import s from "./NotFound.module.css"
import {Link} from "react-router-dom";
import notFoundImage from "./assets/images/404.png"

export default function NotFound() {

    return (
        <div className={s.notFound}>
            <img src={notFoundImage} className={s.notFoundImage} alt="404"/>

            <div className={s.text}>
                <span className={s.notFoundText}>
                    Что-то пошло не так. Запрашиваемая страница не найдена.
                    <br/>
                    Возможно, неправильно указан адрес.
                </span>

                <Link className={s.btn} to="/">
                    Главная страница
                </Link>
            </div>
        </div>
    );
}