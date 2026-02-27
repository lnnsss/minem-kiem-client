import { Helmet } from "react-helmet";
import Oferta from "../components/Oferta/Oferta.tsx";

export default function OfertaPage() {
    return (
        <>
            <Helmet>
                <title>Публичная оферта — MINEM KIEM</title>
                <meta
                    name="description"
                    content="Публичная оферта MINEM KIEM."
                />
                <link rel="canonical" href="https://minem-kiem.ru/oferta" />
            </Helmet>

            <div className="wrapper" id="app"><Oferta /></div>
        </>
    );
}
