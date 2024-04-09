import { useRef, useState } from "react";
import { getAPI } from "../testAPIcalling";
import loadSpinner from '../load.gif';

/*
    Only 1 prop for this component! (for now)
    isOpen --> bool that describes whether dialog is open or not!
*/
const QuoteInfoModal = ({quotes}) => {

    const [quoteInfo, setQuoteInfo] = useState({});
    const [custInfo, setCustInfo] = useState({});

    // API calls to get quote information + customer information
    const getQuoteInfo = (quoteID, salesID, custID) => {
        try {
            getAPI(`http://localhost:8050/quotes/info/${quoteID}/${salesID}/${custID}`)
                .then(data => {
                    console.log(data);
                    setQuoteInfo(data[0]); // this api call should only return 1 item in array
                });
            
            getAPI(`http://localhost:8050/customer/${custID}`)
                .then(data => {
                    console.log(data);
                    setCustInfo(data[0]); // this api call should only return 1 item in array
                });
            
        }
        catch(error) {
            console.log('QuoteInfoModal.jsx - Error:', error);
        }
    }

    // reference to dialog element HTML tag
    const dialog = useRef();

    // opens dialog in modal mode + also fetches data from database about the quote info(may change this later??)
    const handleOpen = (event) => {
        const row_idx = event.target.parentElement.parentElement.parentElement.id; // 3 parent elements: div from QuoteInfoModal -> td (column) -> tr (row)

        const keys = Object.keys(quotes[row_idx]);
        getQuoteInfo(quotes[row_idx][keys[0]], quotes[row_idx][keys[1]], quotes[row_idx][keys[2]]);
        dialog.current.showModal();
    }

    //closes dialog(modal)
    const handleClose = () => {
        dialog.current.close();
    }

    // deletes line item/secret note and updates the state so that the webpage reflects the change
    const handleItemNoteDelete = (event) => {
        const idx = event.target.parentElement.id;
        const type = event.target.name;


        if (type === 'secretnote') {
            secretnotes.secretnotes.splice(idx, 1);

            // save changes done to the quote info
            setQuoteInfo(
                {
                    ...quoteInfo,
                    secretnotes: {
                        "secretnotes": secretnotes.secretnotes
                    }
                }
            );
        }
        else {
            lineitems.line_items.splice(idx, 1);
            
            // save changes done to the quote info
            setQuoteInfo(
                {
                    ...quoteInfo,
                    line_items: {
                        "line_items": lineitems.line_items
                    }
                }
            );
        }
    }

    const handleNewItemNote = (event) => {
        const type = event.target.name;

        if (type === 'newitem') {
            let description = 'New Line Item';
            let price = 1;

            // add new item to the array
            lineitems.line_items.push(
                {
                    description,
                    price
                }
            );

            // update the quoteinfo(state) in the page 
            setQuoteInfo(
                {
                    ...quoteInfo,
                    line_items: {
                        "line_items": lineitems.line_items
                    }
                }
            );
        }
        else {
            let note = 'New Note';

            // add new note to the array
            secretnotes.secretnotes.push(note);

            // update the quoteinfo(state) in the page 
            setQuoteInfo(
                {
                    ...quoteInfo,
                    secretnotes: {
                        "secretnotes": secretnotes.secretnotes
                    }
                }
            );
        }
    }

    // setting up local variables for quote information for the modal
    let lineitems;
    let secretnotes;
    let status;
    if (quoteInfo) {
        lineitems = quoteInfo.line_items;
        secretnotes = quoteInfo.secretnotes;

        if(quoteInfo.is_sanctioned) 
            status = 'Sanctioned';
        else if (quoteInfo.is_finalized)
            status = 'Finalized';
        else
            status = 'In Review'
    }

    return (
        <div>
            <dialog ref={dialog}>
                {(lineitems && secretnotes && custInfo) ? // if-statement
                    // true block
                    <div>
                        <h2>{`Quote for ${custInfo.name}`}</h2>
                        <p>{custInfo.street}</p>
                        <p>{custInfo.city}</p>
                        <p>{custInfo.contact}</p>

                        <p><b>Status:</b> {status}</p>
                        
                        <h3>Line Items:</h3>
                        <button 
                            name="newitem"
                            onClick={handleNewItemNote}
                        >
                            Add New Item
                        </button>
                        {lineitems.line_items.map((item, index) => {
                            return (
                                    <div id={index}>
                                        <input 
                                            name="description"
                                            minLength={3}
                                            type="text"
                                            value={item.description} 
                                        />
                                        <input
                                            name="price"
                                            min={1}
                                            type="number"
                                            value={item.price}
                                        />
                                        <button 
                                            name="lineitem"
                                            onClick={handleItemNoteDelete}
                                        >
                                            Delete
                                        </button>
                                        <br />
                                    </div>
                                );
                            })
                        }

                        <h3>Secret Notes:</h3>
                        <button 
                            name="newnote"
                            onClick={handleNewItemNote}
                        >
                            Add New Note
                        </button>
                        {secretnotes.secretnotes.map((note, index) => {
                            return (
                                    <div id={index} >
                                        <input 
                                            name="note"
                                            type="text"
                                            value={note}
                                        />
                                        <button 
                                            name="secretnote"
                                            onClick={handleItemNoteDelete}
                                        >
                                            Delete
                                        </button>
                                        <br />
                                    </div>
                                );
                            })
                        }

                        <h3>Total Price: ${quoteInfo.price}</h3>

                        <br />
                        <button>Submit</button>
                    </div>
                    // false block -> loading in a gif to show that the modal is loading the info in
                    : <img src={loadSpinner} alt={'loading...'} ></img>
                }

                <br />
                <br />
                
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