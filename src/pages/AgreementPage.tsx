import { Helmet } from "react-helmet";
import Agreement from "../components/Agreement/Agreement.tsx";

export default function AgreementPage() {
    return (
        <>
            <Helmet>
                <title>Пользовательское Соглашение</title>
            </Helmet>

            <div className="wrapper" id="app"><Agreement /></div>
        </>
    );
}
