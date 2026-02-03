import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./app-router";
import {OrderModal} from "./components/UI/OrderModal/OrderModal.tsx";
import ScrollToTop from "./components/UI/ScrollToTop.tsx";
import Preloader from "./components/UI/Preloader/Preloader.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Preloader />
            <AppRouter />
            <OrderModal />
        </BrowserRouter>
    );
}
