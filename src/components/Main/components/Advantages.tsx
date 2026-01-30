import s from '../Main.module.css';

export default function Advantages() {
    return (
        <section id="advantages" className={s.advantages}>
            <div className={`__container ${s.advantages_container}`}>
                <h2 className={s.title}>Преимущества</h2>
                <div className={s.advantages_blocks}>
                    <div className={s.advantages_block}>
                        <h3>Качество</h3>
                        <p>Мы используем только высококачественные ткани , которые обеспечивают долговечность и комфорт.</p>
                    </div>
                    <div className={s.advantages_block}>
                        <h3>Уникальность</h3>
                        <p>Бомбовые и запоминающиеся принты! Они точно выделят вас из толпы</p>
                    </div>
                    <div className={s.advantages_block}>
                        <h3>Свобода</h3>
                        <p>Полный азатлык в движениях и oversize крой</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
