import s from "./Contacts.module.css";
import leftRnmnt from "./assets/images/left3.png";
import rightRnmnt from "./assets/images/right3.png";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import FormInput from "./components/FormInput.tsx";
import { Api } from "../../api/api-helpers.ts";

type FormState = {
    email: string;
    name: string;
    question: string;
};

export default function Contacts() {
    const [form, setForm] = useState<FormState>({
        email: "",
        name: "",
        question: "",
    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await Api.sendContact({
                name: form.name,
                email: form.email,
                message: form.question,
            });
            console.log("Отправлено успешно:", response.data);
            alert("Ваше сообщение отправлено!");
            setForm({ email: "", name: "", question: "" });
        } catch (error) {
            console.error("Ошибка отправки:", error);
            alert("Произошла ошибка при отправке сообщения.");
        }
    };

    return (
        <>
            <Header theme="white" />
            <div className={s.contacts}>
                <div className={s.contacts_cover}>
                    <h2>Контакты</h2>
                </div>

                <div className={s.contacts_content}>
                    <img src={leftRnmnt} alt="left ornament" className={s.leftRnmnt} />
                    <img src={rightRnmnt} alt="right ornament" className={s.rightRnmnt} />

                    <div className={`__container ${s.contacts_container}`}>
                        <h3>Задайте любой интересующий вас вопрос</h3>

                        <form className={s.contacts_form} onSubmit={handleSubmit}>
                            <FormInput
                                type="email"
                                name="email"
                                value={form.email}
                                placeholder="Ваш Email"
                                onChange={handleChange}
                            />
                            <FormInput
                                name="name"
                                value={form.name}
                                placeholder="Имя"
                                onChange={handleChange}
                            />
                            <FormInput
                                name="question"
                                value={form.question}
                                placeholder="Ваш вопрос"
                                textarea
                                onChange={handleChange}
                            />
                            <button className={s.contacts_btn}>Отправить</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
