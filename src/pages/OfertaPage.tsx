import { Helmet } from "react-helmet";
import Oferta from "../components/Oferta/Oferta.tsx";

export default function OfertaPage() {
    return (
        <>
            <Helmet>
                <title>Публичная оферта</title>
            </Helmet>

            <div className="wrapper" id="app"><Oferta /></div>
        </>
    );
}
