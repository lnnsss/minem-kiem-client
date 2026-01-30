import s from "./Main.module.css"
import Hero from "./components/Hero.tsx";
import About from "./components/About.tsx";
import Advantages from "./components/Advantages.tsx";
import Team from "./components/Team.tsx";
import Reviews from "./components/Reviews.tsx";
import Write from "./components/Write.tsx";
import Questions from "./components/Questions.tsx";
import Footer from "../Footer/Footer.tsx";

import rnmntLeft from './assets/images/rnmntLeft.png';
import rnmntRight from './assets/images/rnmntRight.png';
import rnmntLeft2 from './assets/images/rnmntLeft2.png';
import rnmntRight2 from './assets/images/rnmntRight2.png';

export default function Main() {

    return (
        <>
            <Hero/>
            <div className={s.main}>

                <div className={s.wrnmnt}>
                    <img src={rnmntLeft} alt="rnmntLeft" className={s.rnmntLeft}/>
                    <img src={rnmntRight} alt="rnmntRight" className={s.rnmntRight}/>
                    <div className={s.wrnmnt_content}>
                        <About/>
                        <Advantages/>
                    </div>
                </div>

                <Team/>

                <div className={s.wrnmnt}>
                    <img src={rnmntLeft2} alt="rnmntLeft" className={s.rnmntLeft}/>
                    <img src={rnmntRight2} alt="rnmntRight" className={s.rnmntRight}/>
                    <div className={s.wrnmnt_content}>
                        <Reviews />
                        <Write/>
                        <Questions/>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    );
}
