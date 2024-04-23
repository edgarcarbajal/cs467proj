import { useState } from "react";
import AdminQuotesView from "./AdminQuotesView";
import AdminAssociateView from "./AdminAssociateView";

const AdminInterface = () => {
    const [isQuoteView, setIsQuoteView] = useState(false);


    return(
        <div>
            <div className="flex flex-row">
                <h1>Admin Interface</h1>

                <button
                    className="subLinkBlack"
                    onClick={() => setIsQuoteView(false)}
                >
                    Sales Associates
                </button>
                <button
                    className="subLinkBlack"
                    onClick={() => setIsQuoteView(true)}
                >
                    Quotes
                </button>
            </div>

            {isQuoteView ? <AdminQuotesView /> : <AdminAssociateView />}
        </div>
    );
}

export default AdminInterface;