import { Helmet } from "react-helmet";
import Contacts from "../components/Contacts/Contacts.tsx";

export default function ContactsPage() {
    return (
        <>
            <Helmet>
                <title>Контакты</title>
            </Helmet>

            <div className="wrapper" id="app"><Contacts /></div>
        </>
    );
}
