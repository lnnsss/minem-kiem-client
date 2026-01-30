import pin from '../assets/images/pin.png';
import team1 from '../assets/images/team1.jpg';
import team2 from '../assets/images/team2.jpg';
import s from '../Main.module.css';

export default function Team() {
    return (
        <section id="team" className={s.team}>
            <div className={`__container ${s.team_container}`}>
                <h2 className={s.title}>Наша команда</h2>
                <div className={s.team_cards}>
                    <div className={`${s.team_card} ${s.team_card_wphoto}`}>
                        <img src={pin} alt="Пин" className={s.team_card_pin} />
                        <img src={team1} alt="Тимур" className={s.team_card_photo} />
                        <span className={s.team_card_name}>Тимур</span>
                    </div>
                    <div className={`${s.team_card} ${s.team_card_wtext}`}>
                        <img src={pin} alt="Пин" className={s.team_card_pin} />
                        <p className={s.team_card_text}>Раис бренда. Тот самый человек, который
                            превращает татарские мемы в культурный код на одежде. Читает лекции, выступает на фестивалях
                            и мероприятиях, где рассказывает, как мода и юмор помогают сохранить язык живым.
                            В бренде отвечает за идеи коллекций, смыслы за принтами и продвижение проекта:
                            от паблик-токов до коллабораций с сообществами. </p>
                    </div>
                    <div className={`${s.team_card} ${s.team_card_wphoto}`}>
                        <img src={pin} alt="Пин" className={s.team_card_pin} />
                        <img src={team2} alt="Рената" className={s.team_card_photo} />
                        <span className={s.team_card_name}>Рената</span>
                    </div>
                    <div className={`${s.team_card} ${s.team_card_wtext}`}>
                        <img src={pin} alt="Пин" className={s.team_card_pin} />
                        <p className={s.team_card_text}>Главный мотиватор Раиса.
                            Превращает идеи бренда в яркий визуальный и текстовый контент. Делает съёмки, придумывает
                            рубрики, пишет подписи и сторис, следит, чтобы в каждом посте звучал живой татарский язык
                            и узнаваемый мемный юмор. <br/>В бренде отвечает за tone of voice и облик «Минем кием»
                            в диджитале: от концепции контент-плана до общения с партнёрами. </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
