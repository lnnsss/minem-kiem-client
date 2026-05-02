import reviews1 from '../assets/images/reviews1.webp';
import reviews2 from '../assets/images/reviews2.webp';
import reviews3 from '../assets/images/reviews3.webp';
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
                            <img src={reviews1} alt="Айгиз" className={s.reviews_block_avatar} />
                            <div className={s.reviews_block_info}>
                                <span className={s.reviews_block_name}>Айгиз</span>
                                <div className={s.reviews_block_stars}>
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                </div>
                            </div>
                        </div>
                        <p className={s.reviews_block_text}>
                            Качество изделия на высоте! Принт после стирки остается таким же четким и качественным. 
                            Отдельная приятность - это открытка, очень сильно согревает душу)) 
                            В данный момент не вижу никаких недостатков, буду заказывать дальше!
                        </p>
                    </div>
                    <div className={s.reviews_block}>
                        <div className={s.reviews_block_header}>
                            <img src={reviews2} alt="Карима" className={s.reviews_block_avatar} />
                            <div className={s.reviews_block_info}>
                                <span className={s.reviews_block_name}>Карима</span>
                                <div className={s.reviews_block_stars}>
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                </div>
                            </div>
                        </div>
                        <p className={s.reviews_block_text}>Вы со мной уже больше 1,5 лет. В идеальном состоянии и качестве. 
                            Вот накоплю денег побольше, я куплю все. Если выпустите однажды полный комплект (как вы уже выпускали, 
                            но в разных цветах и вообще разных лекал) я точно куплю себе еще один. Потому что он сидит идеально, выглядит идеально, 
                            сколько не стирай и не пачкай - все отстирывается. Ну и конечно очень приятно ходить по Москве и кричать своим свитшотом 
                            о том, что я татарка.
                        </p>
                    </div>
                    <div className={s.reviews_block}>
                        <div className={s.reviews_block_header}>
                            <img src={reviews3} alt="Карим" className={s.reviews_block_avatar} />
                            <div className={s.reviews_block_info}>
                                <span className={s.reviews_block_name}>Карим</span>
                                <div className={s.reviews_block_stars}>
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                </div>
                            </div>
                        </div>
                        <p className={s.reviews_block_text}>
                            Минем кием это что-то особенное. Очень рад, что однажды решил поучаствовать в конкурсе и победил! 
                            Вещи действительно крутые, стильные. Спасибо бренду за развитие татарской культуры, 
                            и что радуете такими крутыми вещами!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
