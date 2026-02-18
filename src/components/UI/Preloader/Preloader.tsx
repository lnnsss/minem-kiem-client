import { useState, useEffect } from 'react';
import s from './Preloader.module.css';
import logo from './logo.png';

export default function Preloader() {
    const [isVisible, setIsVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadeOut(true);
        }, 2000);

        const fadeTimer = setTimeout(() => {
            setIsVisible(false);
        }, 2800);

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
