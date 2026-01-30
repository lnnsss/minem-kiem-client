import s from '../Main.module.css';
import {Link} from "react-router-dom";

export default function Write() {
    return (
        <section id="write" className={s.write}>
            <div className={`__container ${s.write_container}`}>
                <div className={s.write_content}>
                    <h2>Откройте для себя <br/>новый стиль</h2>
                    <Link to="/shop" className={s.write_link}>Заказать</Link>
                </div>
            </div>
        </section>
    );
}
