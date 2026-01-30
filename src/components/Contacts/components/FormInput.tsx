import s from "../Contacts.module.css";
import type { ChangeEvent } from "react";

type FormInputProps = {
    type?: "text" | "email";
    name: string;
    value: string;
    placeholder?: string;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    textarea?: boolean;
};

export default function FormInput({
                                      type = "text",
                                      name,
                                      value,
                                      placeholder,
                                      onChange,
                                      textarea = false,
                                  }: FormInputProps) {

    if (textarea) {
        return (
            <textarea
                name={name}
                value={value}
                placeholder={placeholder}
                className={s.contacts_input}
                onChange={onChange}
                rows={6}
            />
        );
    }

    return (
        <input
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            className={s.contacts_input}
            onChange={onChange}
        />
    );
}
