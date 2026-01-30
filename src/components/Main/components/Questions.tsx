import s from '../Main.module.css';
import { useState } from 'react';

export default function Questions() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const questions = [
        {
            question: "Принт не сойдёт после нескольких стирок?",
            answer: "Используем стойкие краски и проверенную технологию нанесения. При соблюдении рекомендаций по уходу принт долго сохраняет яркость."
        },
        {
            question: "Как устроена доставка?",
            answer: "Отправляем заказы по Татарстану и России через службы доставки и Почту России. Средний срок — от 2 до 7 дней в зависимости от региона."
        },
        {
            question: "Какой фасон и посадка?",
            answer: "Фасоны свободные, комфортные, с учётом oversize-посадки. Размерная сетка помогает подобрать удобный вариант."
        }
    ];

    return (
        <section id="questions" className={s.questions}>
            <div className={`__container ${s.questions_container}`}>
                <h2 className={s.title}>Часто задаваемые вопросы</h2>
                <div className={s.questions_blocks}>
                    {questions.map((item, index) => (
                        <div key={index} className={`${s.questions_item} ${activeIndex === index ? s.questions_item_active : ''}`}>
                            <button
                                className={s.questions_header}
                                type="button"
                                onClick={() => toggleItem(index)}
                            >
                                <span className={s.questions_question}>{item.question}</span>
                                <span className={s.questions_icon}>
                                    <span></span>
                                    <span></span>
                                </span>
                            </button>
                            <div className={`${s.questions_content} ${activeIndex === index ? s.questions_content_active : ''}`}>
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
