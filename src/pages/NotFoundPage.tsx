import { Helmet } from "react-helmet";
import NotFound from "../components/NotFound/NotFound.tsx";

export default function NotFoundPage() {
    return (
        <>
            <Helmet>
                <title>Страница не найдена — MINEM KIEM</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>

            <div className="wrapper" id="app"><NotFound /></div>
        </>
    );
}
