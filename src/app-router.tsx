import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

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
