import { useState, useEffect } from 'react';
import s from './Preloader.module.css';
import logo from './logo.png';

export default function Preloader() {
    const [isVisible, setIsVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true); // Сначала fade класс
        }, 2000);

        const fadeTimer = setTimeout(() => {
            setIsVisible(false); // Потом скрыть
        }, 2800); // +0.8s на transition

        return () => {
            clearTimeout(timer);
            clearTimeout(fadeTimer);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div className={`${s.preloader} ${fadeOut ? s.fadeOut : ''}`}>
            <img src={logo} alt="Loading" className={s.logo} />
        </div>
    );
}
