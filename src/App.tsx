import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./app-router";
import {OrderModal} from "./components/UI/OrderModal/OrderModal.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <AppRouter />
            <OrderModal />
        </BrowserRouter>
    );
}
