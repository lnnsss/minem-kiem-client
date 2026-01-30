import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import ContactsPage from "./pages/ContactsPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/shop" element={<ProductsPage />} />
            <Route path="/shop/:id" element={<ProductPage />} />
            <Route path="/contacts" element={<ContactsPage />} />

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};
