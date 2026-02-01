import { useState } from "react";
import s from "./ProductImageModal.module.css";
import CloseIcon from "./CloseIcon";

interface ProductImageModalProps {
    images: string[];
    initialIndex: number;
    onClose: () => void;
}

const ProductImageModal = ({
                               images,
                               initialIndex,
                               onClose,
                           }: ProductImageModalProps) => {
    const [activeIndex, setActiveIndex] = useState(initialIndex);

    return (
        <div className={s.overlay} onClick={onClose}>
            <div className={s.modal} onClick={(e) => e.stopPropagation()}>
                <button className={s.closeBtn} onClick={onClose}>
                    <CloseIcon />
                </button>

                <img
                    src={images[activeIndex]}
                    alt={`product-${activeIndex}`}
                    className={s.modalImage}
                />

                <div className={s.thumbnails}>
                    {images.map((url, idx) => (
                        <img
                            key={idx}
                            src={url}
                            className={`${s.thumbnail} ${
                                activeIndex === idx ? s.active : ""
                            }`}
                            onClick={() => setActiveIndex(idx)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductImageModal;
