import { useRef, useState } from "react";
import loadSpinner from '../load.gif';
import { useNavigate } from "react-router-dom";
import { getAPI, authRouting } from "../APICallingUtilities";
import '../css_files/App.css';

const AdminQuoteModal = ({adminQuotes}) => {

    /* API calls to get quote information + customer information */
    const [quoteInfo, setQuoteInfo] = useState({});
    const [custInfo, setCustInfo] = useState({});
    const pageNavigator = useNavigate();

    // Loads quoteInfo and customerInfo DB
    const getQuoteInfo = async (quoteID, custID, salesID, quoteStatus) => {
        try {
            const [quoteData, customerData] = await Promise.all([
                getAPI(`http://localhost:8050/quotes/info/${quoteID}/${custID}/${salesID}`, sessionStorage.getItem('UserAuth')),
                getAPI(`http://localhost:8050/customer/${custID}`, sessionStorage.getItem('UserAuth'))
            ]);

            authRouting(quoteData, pageNavigator); // function that checks if authorized or not
            authRouting(customerData, pageNavigator); // function that checks if authorized or not

            setQuoteInfo({
                ...quoteData[0],
                status: quoteStatus
            });
            setCustInfo(customerData[0]);
        } catch (error) {
            console.log('QuoteInfoModal.jsx - Error:', error);
        }
    }

    /* Modal Handle Open and Close */
    // reference to dialog element HTML tag
    const dialog = useRef();

    // opens dialog in modal mode + also fetches data from database about the quote info(may change this later??)
    const handleOpen = (event) => {
        const row_idx = event.target.parentElement.parentElement.parentElement.id; // 3 parent elements: div from QuoteInfoModal -> td (column) -> tr (row)
        const status = adminQuotes[row_idx].Status;

        // Sending (QuoteID, CustID, SalesID) in Order
        getQuoteInfo(adminQuotes[row_idx].id, adminQuotes[row_idx].cust_id, adminQuotes[row_idx].sale_id, status);

        dialog.current.showModal();
    }

    //closes dialog(modal)
    const handleClose = () => {
        dialog.current.close();
    }

   
    // setting up local variables for quote information for the modal
    let lineitems, secretnotes, discounts, isDisabled;

    if (quoteInfo) {
        lineitems = quoteInfo.line_items;
        secretnotes = quoteInfo.secretnotes;
        discounts = quoteInfo.discounts;

        isDisabled = quoteInfo.status === 'Ordered';
    }

    return (
        <div>
            <dialog 
                className="w-6/12"
                ref={dialog}
            >
                {(lineitems && secretnotes && custInfo) ? // if-statement
                    // true block -> render the elements inside the modal
                    <div>
                        <h2>{`Quote for ${custInfo.name}`}</h2>
                        <p>{custInfo.street}</p>
                        <p>{custInfo.city}</p>
                        <p>{custInfo.contact}</p>

                        <p><b>Status:</b> {quoteInfo.status}</p>

                        <h3>Customer Email Contact:</h3>
                        <input
                            name="cust_email"
                            type="email"
                            value={quoteInfo.cust_email}
                            disabled={isDisabled}
                        />

                        <h3>Line Items:</h3>
                        <button
                            className="subLinkGreen"
                            name="newitem"
                            disabled={isDisabled}
                        >
                            Add New Item
                        </button>
                        {lineitems.line_items.map((item, index) => {
                            return (
                                <div id={index} name="lineitem" >
                                    <input
                                        name="description"
                                        minLength={3}
                                        type="text"
                                        value={item.description}
                                        disabled={isDisabled}
                                    />
                                    <input
                                        name="price"
                                        min={1}
                                        type="number"
                                        value={item.price}
                                        disabled={isDisabled}
                                    />
                                    <button
                                        className="subLinkRed"
                                        name="lineitem"
                                        disabled={isDisabled}
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
                            className="subLinkGreen"
                            name="newnote"
                            disabled={isDisabled}
                        >
                            Add New Note
                        </button>
                        {secretnotes.secretnotes.map((note, index) => {
                                return (
                                    <div id={index} name="secretnote" >
                                        <input
                                            name="note"
                                            type="text"
                                            value={note}
                                            disabled={isDisabled}
                                        />
                                        <button
                                            className="subLinkRed"
                                            name="secretnote"
                                            disabled={isDisabled}
                                        >
                                            Delete
                                        </button>
                                        <br />
                                    </div>
                                );
                            })
                        }

                        <h3>Discounts</h3>
                        <button
                            className="subLinkGreen"
                            name="newdiscount"
                            disabled={isDisabled}
                        >
                            Add New Discount
                        </button>
                        {discounts.discounts.map((discount, index) => {
                            const isAmountSelected = discount.type === 'amount';
                            return (
                                <div id={index}>
                                    <select id={`entryDiscountType`} disabled={isDisabled}>
                                        <option
                                            selected={isAmountSelected}
                                            value={'amount'}
                                        >
                                            Amount
                                        </option>
                                        <option
                                            selected={!isAmountSelected}
                                            value={'percent'}
                                        >
                                            Percent
                                        </option>
                                    </select>
                                    <input
                                        name="discount"
                                        min={0.01}
                                        type="number"
                                        value={discount.value}
                                        disabled={isDisabled}
                                    />
                                    <button
                                        className="subLinkRed"
                                        name="discount"
                                        disabled={isDisabled}
                                    >
                                        Delete
                                    </button>
                                </div>
                            );
                        })}

                        <br />
                        <h3>Total Price: ${quoteInfo.price}</h3>
                    </div>
                    // false block -> loading in a gif to show that the modal is loading the info in
                    : <img src={loadSpinner} alt={'loading...'} ></img>
                }

                <br />
                <hr />
                <br />

                <button 
                    className="subLinkBlack"
                    onClick={handleClose}
                >
                    Close
                </button>
                <br />
                <br />
            </dialog>
            <button 
                className="subLinkBlack"
                onClick={handleOpen}
            >
                View/Edit Quote
            </button>
        </div>
    );
};

export default AdminQuoteModal;