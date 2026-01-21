import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./app-router";
import Header from "./components/Header/Header";

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <AppRouter />
        </BrowserRouter>
    );
}
