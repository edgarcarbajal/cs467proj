import { useRef, useState } from "react";
import { getAPI } from "../testAPIcalling";

/*
    Only 1 prop for this component! (for now)
    isOpen --> bool that describes whether dialog is open or not!
*/
const QuoteInfoModal = ({quotes}) => {

    const [quoteInfo, setQuoteInfo] = useState([]);

    const getQuoteInfo = (quoteID, salesID, custID) => {
        try {
            getAPI(`http://localhost:8050/quotes/info/${quoteID}/${salesID}/${custID}`)
                .then(data => {
                    console.log(data)
                    setQuoteInfo(data)
                });
        }
        catch(error) {
            console.log('QuoteInfoModal.jsx - Error:', error);
        }
    }

    const dialog = useRef();
    const handleOpen = (event) => {
        const row_idx = event.target.parentElement.parentElement.parentElement.id; // 3 parent elements: div from QuoteInfoModal -> td (column) -> tr (row)

        const keys = Object.keys(quotes[row_idx]);
        getQuoteInfo(quotes[row_idx][keys[0]], quotes[row_idx][keys[1]], quotes[row_idx][keys[2]]);
        dialog.current.showModal();
    }

    const handleClose = () => {
        dialog.current.close();
    }

    return (
        <div>
            <dialog ref={dialog}>
                <h2>Quote Information</h2>
                <p>Hello!</p>
                
                <button onClick={handleClose}>
                    Close
                </button>
            </dialog>
            <button onClick={handleOpen}>
                Edit
            </button>
        </div>
    );
};

export default QuoteInfoModal;