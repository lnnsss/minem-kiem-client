import s from "../Main.module.css"
import photo1 from '../assets/images/photo1.jpg';
import photo2 from '../assets/images/photo2.jpg';
import photo3 from '../assets/images/photo3.jpg';
import photo4 from '../assets/images/photo4.jpg';

export default function About() {
    return (
        <section id="about" className={s.about}>
            <div className={`__container ${s.about_container}`}>
                <div className={`${s.about_block} ${s.about_block1}`}>
                    <div className={s.about_block_text}>
                        <h3 className={s.title}>Кто мы?</h3>
                        <p>Minem Kiem — это бренд современной татарской одежды,
                            который стремится сделать татарскую культуру стильной и вкусной.</p>
                    </div>
                    <img src={photo1} alt="Кто мы?" className={s.about_block_image}/>
                </div>
                <div className={`${s.about_block} ${s.about_block2}`}>
                    <div className={s.about_block_text}>
                        <h3 className={s.title}>Почему национальный стиль?</h3>
                        <p>Национальный стиль в одежде важен как способ самовыражения и сохранения культурного наследия
                            и идентичности народа. Показывая в атрибутах одежды принадлежность к национальности, человек
                            выражает уважение к своим корням, традициям и истории. Одежда с элементами национального
                            стиля помогает сохранять уникальные традиции, символизирует культурное богатство и разнообразие,
                            а также подчёркивает индивидуальность. Ношение такой одежды усиливает чувство принадлежности
                            к своему народу, сплачивает сообщество и поддерживает местных ремесленников и экономику.</p>
                    </div>
                    <img src={photo2} alt="Почему национальный стиль?" className={s.about_block_image}/>
                </div>
                <div className={`${s.about_block} ${s.about_block3}`}>
                    <div className={s.about_block_text}>
                        <h3 className={s.title}>Для кого мы созданы?</h3>
                        <p>Бренд Minem Kiem создан для людей, которые интересуются татарской культурой, ценят традиции
                            и хотят добавить элементы этой культуры в свой гардероб. Одежда от Minem Kiem подходит как
                            для повседневного ношения, так и для особых случаев, где можно выразить свою
                            индивидуальность и уважение к культурному наследию.</p>
                    </div>
                    <img src={photo3} alt="Для кого мы созданы?" className={s.about_block_image}/>
                </div>
                <div className={`${s.about_block} ${s.about_block4}`}>
                    <div className={s.about_block_text}>
                        <h3 className={s.title}>Когда мы нужны?</h3>
                        <p>О бренде Minem Kiem вы будете вспоминать, когда захотите поехать за границу.Когда захочется
                            частички родной культуры в стиле. В одежде от Minem Kiem вы всегда будете самым
                            национально стильным, будь то деловая встреча, мероприятие или повседневная жизнь.
                            Коллекции Minem Kiem предлагают возможность носить стильную и качественную одежду,
                            которая поможет создать запоминающийся образ.</p>
                    </div>
                    <img src={photo4} alt="Когда мы нужны?" className={s.about_block_image}/>
                </div>
            </div>
        </section>
    )
}