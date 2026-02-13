import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import ContactsPage from "./pages/ContactsPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import AgreementPage from "./pages/OfertaPage.tsx";
import PoliticsPage from "./pages/PoliticsPage.tsx";
import OfertaPage from "./pages/OfertaPage.tsx";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />

            <Route path="/shop" element={<ProductsPage />} />
            <Route path="/shop/:id" element={<ProductPage />} />
            <Route path="/contacts" element={<ContactsPage />} />

            <Route path="/agreement" element={<AgreementPage />} />
                <Route path="/politics" element={<PoliticsPage />} />
            <Route path="/oferta" element={<OfertaPage />} />

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};
