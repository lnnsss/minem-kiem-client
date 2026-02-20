import styles from './PointList.module.css';

interface PointListProps {
    title: string;
    items: string[];
}

export default function PointList({ title, items }: PointListProps) {
    return (
        <ul className={styles.content_block}>
            <h4>{title}</h4>
            {items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    );
}
