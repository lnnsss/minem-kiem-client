import s from "./Agreement.module.css"
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";
import PointList from "./components/PointList/PointList.tsx";
import data from "./data.ts";
import leftRnmnt from "./assets/images/l.png";
import rightRnmnt from "./assets/images/r.png";

export default function Agreement() {

    return (
        <>
            <Header theme="green" />

            <div className={s.agreement}>
                <img src={leftRnmnt} alt="leftRnmnt" className={s.leftRnmnt} />
                <img src={rightRnmnt} alt="rightRnmnt" className={s.rightRnmnt}/>
                <div className={`__container ${s.agreement_container}`}>
                    <div className={s.title}>
                        <h2>Пользовательское соглашение</h2>
                        <span>Редакция от 20 февраля 2026 года</span>
                    </div>
                    <div className={s.content}>
                        <p>
                            Настоящее Пользовательское Соглашение (Далее Соглашение) регулирует отношения между Индивидуальный
                            предприниматель Султанов Тимур Ильгизович http://minem-kiem.ru (далее Онлайн-магазин одежды
                            "Minem Kiem" или Администрация) с одной стороны и пользователем сайта с другой.
                        </p>
                        <p>Сайт Онлайн-магазин одежды "Minem Kiem" не является средством массовой информации.</p>
                        <p>
                            Используя сайт, Вы соглашаетесь с условиями данного соглашения.
                            Если Вы не согласны с условиями данного соглашения,
                            не используйте сайт Онлайн-магазин одежды "Minem Kiem"!
                        </p>
                        <h3>Права и обязанности сторон</h3>
                        <PointList title={data.userRights} items={data.userRightsItems} />
                        <PointList title={data.adminRights} items={data.adminRightsItems} />
                        <PointList title={data.userUndertakes} items={data.userUndertakesItems} />
                        <PointList title={data.adminUndertakes} items={data.adminUndertakesItems} />
                        <PointList title={data.partiesResponsibility} items={data.partiesResponsibilityItems} />

                        <div className={s.content_block}>
                            <h3>Условия действия Соглашения</h3>
                            <p>Данное Соглашение вступает в силу при любом использовании данного сайта.</p>
                            <p>Соглашение перестает действовать при появлении его новой версии.</p>
                            <p>Администрация оставляет за собой право в одностороннем порядке изменять данное соглашение по своему усмотрению.</p>
                            <p>Администрация не оповещает пользователей об изменении в Соглашении.</p>
                        </div>

                        <div className={s.content_block}>
                            <h3>Контакты продавца</h3>
                            <p>Наименование: ИП Султанов Тимур Ильгизович</p>
                            <p>Адрес: 169710, РОССИЯ, РЕСП КОМИ, Г УСИНСК, УЛ ЛЕНИНА, Д 11, КВ 4</p>
                            <p>ИНН: 021403019256</p>
                            <p>ОГРНИП: 326110000005098</p>
                            <p>Банк: АО «ТБанк»</p>
                            <p>ИНН банка: 7710140679</p>
                            <p>БИК банка: 044525974</p>
                            <p>Расчетный счет: 40802810700009362712</p>
                            <p>Корреспондентский счет: 30101810145250000974</p>
                            <p>Электронная почта: minem.kiem@gmail.com</p>
                            <p>Контактный телефон: +79951333051</p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}