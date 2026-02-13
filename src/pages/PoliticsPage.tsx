import { Helmet } from "react-helmet";
import Politics from "../components/Politics/Politics.tsx";

export default function PoliticsPage() {
    return (
        <>
            <Helmet>
                <title>Политика обработки персональных данных</title>
            </Helmet>

            <div className="wrapper" id="app"><Politics /></div>
        </>
    );
}
