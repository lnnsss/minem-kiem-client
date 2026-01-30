import reviews1 from '../assets/images/reviews1.jpg';
import reviews2 from '../assets/images/reviews2.jpg';
import reviews3 from '../assets/images/reviews3.jpg';
import s from '../Main.module.css';

function Star() {
    return (
        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg" className={s.star}>
            <path d="M9.51062 0L11.7558 6.90983H19.0212L13.1433 11.1803L15.3885 18.0902L9.51062 13.8197L3.63277 18.0902L5.87791 11.1803L5.53131e-05 6.90983H7.26548L9.51062 0Z" fill="#FFE100"/>
        </svg>
    );
}

export default function Reviews() {
    return (
        <section id="reviews" className={s.reviews}>
            <div className={`__container ${s.reviews_container}`}>
                <h2 className={s.title}>Отзывы</h2>
                <div className={s.reviews_blocks}>
                    <div className={s.reviews_block}>
                        <div className={s.reviews_block_header}>
                            <img src={reviews1} alt="Ринат" className={s.reviews_block_avatar} />
                            <div className={s.reviews_block_info}>
                                <span className={s.reviews_block_name}>Ринат</span>
                                <div className={s.reviews_block_stars}>
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                </div>
                            </div>
                        </div>
                        <p className={s.reviews_block_text}>Заказывал лонгслив с принтом на татарском — качество огонь,
                            швы ровные, ткань плотная. Порадовало, что размер сел точно по сетке. На улице несколько раз
                            спрашивали, где взял такой принт. Доставка быстрая, упаковка аккуратная.</p>
                    </div>
                    <div className={s.reviews_block}>
                        <div className={s.reviews_block_header}>
                            <img src={reviews2} alt="Марат" className={s.reviews_block_avatar} />
                            <div className={s.reviews_block_info}>
                                <span className={s.reviews_block_name}>Марат</span>
                                <div className={s.reviews_block_stars}>
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                </div>
                            </div>
                        </div>
                        <p className={s.reviews_block_text}>Взял футболку «мемную» брату в подарок — попал в точку!
                            Цвет не полинял после стирки, принт чёткий, без трещинок. Очень нравится, что шрифты
                            и фразы — родные, свои. Теперь присматриваю худи.
                        </p>
                    </div>
                    <div className={s.reviews_block}>
                        <div className={s.reviews_block_header}>
                            <img src={reviews3} alt="Тимур" className={s.reviews_block_avatar} />
                            <div className={s.reviews_block_info}>
                                <span className={s.reviews_block_name}>Тимур</span>
                                <div className={s.reviews_block_stars}>
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                </div>
                            </div>
                        </div>
                        <p className={s.reviews_block_text}>Оформил предзаказ на лонгслив: пришёл вовремя, посадка свободная,
                            как люблю. Принт смешной и при этом про наше — сразу настроение поднимает.
                            Служба поддержки быстро ответила по размеру, помогли выбрать. Отличный бренд, будем брать ещё.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
