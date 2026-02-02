import s from "../OrderModal.module.css";

type ModalInputProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;

    type?: "text";
    textarea?: boolean;
    placeholder?: string;
    phone?: boolean;
};

const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);

    if (!digits) return "";

    let result = "+7";

    if (digits.length > 1) {
        result += " (" + digits.slice(1, 4);
    }
    if (digits.length >= 5) {
        result += ") " + digits.slice(4, 7);
    }
    if (digits.length >= 8) {
        result += "-" + digits.slice(7, 9);
    }
    if (digits.length >= 10) {
        result += "-" + digits.slice(9, 11);
    }

    return result;
};

export const ModalInput = ({
                               label,
                               value,
                               onChange,
                               textarea = false,
                               placeholder,
                               phone = false,
                           }: ModalInputProps) => {

    const handleChange = (val: string) => {
        if (!phone) {
            onChange(val);
            return;
        }

        onChange(formatPhone(val));
    };

    return (
        <div className={s.modal_input}>
            <label className={s.modal_input_label}>{label}</label>

            {textarea ? (
                <textarea
                    className={s.modal_input_input}
                    value={value}
                    placeholder={placeholder}
                    onChange={e => handleChange(e.target.value)}
                />
            ) : (
                <input
                    className={s.modal_input_input}
                    value={value}
                    placeholder={placeholder}
                    onChange={e => handleChange(e.target.value)}
                    inputMode={phone ? "numeric" : "text"}
                />
            )}
        </div>
    );
};
