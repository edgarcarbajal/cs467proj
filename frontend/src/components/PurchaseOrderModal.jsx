import { useRef, useState } from "react";
import { getAPI, postAPI, putAPI } from "../testAPIcalling";
import loadSpinner from '../load.gif';

/*
    Only 1 prop for this component! (for now)
    isOpen --> bool that describes whether dialog is open or not!
*/
const PurchaseOrderModal = ({quotes, onUpdateQuote}) => {

    // useState vars - Used to rerender the component when any of the contents of these variables change
    const [quoteInfo, setQuoteInfo] = useState({});
    const [custInfo, setCustInfo] = useState({});
    //const [discountedPrice, setDiscountedPrice] = useState(0.0);

    // API calls to get quote information + customer information
    const getQuoteInfo = (quoteID, salesID, custID) => {
        try {
            // console.log(quoteID, salesID, custID);
            getAPI(`http://localhost:8050/quotes/info/${quoteID}/${salesID}/${custID}`)
                .then(data => {
                    setQuoteInfo(data[0]); // this api call should only return 1 item in array
                    //setDiscountedPrice(data[0].price);
                });
            
            getAPI(`http://localhost:8050/customer/${custID}`)
                .then(data => {
                    setCustInfo(data[0]); // this api call should only return 1 item in array
                });
            
        }
        catch(error) {
            console.log('PurchaseOrderModal.jsx - Error:', error);
        }
    }

    // updates Quote Info in DB usng API call (should only be called when quoteInfo has been loaded (ie: modal fully rendered))
    const updateQuoteInfoNSanction = (event) => {
        try{
            const type = event.target.name;
            let newQuoteInfo = {
                ...quoteInfo,
                price
            };

            putAPI(
                `http://localhost:8050/quotes/updateInfo/${quoteInfo.id}/${quoteInfo.cust_id}/${quoteInfo.sale_id}`,
                newQuoteInfo
            )
            .then(data => {

                // send email of quote info to customer here using backend API!
                postAPI(
                    'http://localhost:8050/email/sendUpdatedQuoteInfo',
                    {
                        quoteInfo: newQuoteInfo,
                        custInfo
                    }
                );

                // show message to user that updated quote info email has been sent!
                window.alert(`Order is processed and information sent to customer at the email: ${newQuoteInfo.cust_email}`);

                //close modal after submission
                dialog.current.close();

                // send info to StaffInterface that db has been updated so that it rerenders its table
                onUpdateQuote();
            })
        }
        catch(error) {
            console.log('PurchaseOrderModal.jsx - Error:', error);
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
    const handleQuoteInfoItemDelete = (event) => {
        const idx = event.target.parentElement.id;
        const type = event.target.name;


        if(type === 'discount') {
            discounts.discounts.splice(idx, 1);
            // save changes done to the quote info
            setQuoteInfo(
                {
                    ...quoteInfo,
                    discounts: {
                        "discounts": discounts.discounts
                    }
                }
            );
        }
    }

    const handleNewQuoteInfoEntry = (event) => {
        const inputType = event.target.name;

        if (inputType === 'newdiscount') {
            let type = 'percent';
            let value = 1;

            // add new discount to array
            discounts.discounts.push({
                type,
                value
            });

            // update the quoteinfo(state) in the page 
            setQuoteInfo(
                {
                    ...quoteInfo,
                    discounts: {
                        "discounts": discounts.discounts
                    }
                }
            );
        }
    }

    // handle the onChange even on the input tags (when user changes information stored about the quote)
    const handleQuoteInfoInputChange = (event) => {
        const idx = event.target.parentElement.id;
        const itemAttribute = event.target.name;
        const inputvalue = event.target.value;


        if(itemAttribute === 'discount'){
            // update local array
            discounts.discounts[idx] = {
                ...discounts.discounts[idx],
                "value": inputvalue
            };

            // update state(website view)
            setQuoteInfo(
                {
                    ...quoteInfo,
                    discounts: {
                        "discounts": discounts.discounts
                    }
                }
            );
        }
    }

    const handleDiscountTypeChange = (event) => {
        const idx = event.target.parentElement.id;
        const discountType = event.target.value;

        // update local array
        discounts.discounts[idx] = {
            ...discounts.discounts[idx],
            "type": discountType
        };

        // update state(website view)
        setQuoteInfo(
            {
                ...quoteInfo,
                discounts: {
                    "discounts": discounts.discounts
                }
            }
        );
    }

    const calculateTotalPrice = (value) => {
        price += parseFloat(value);
    }

    const calculateDiscountPrice = (isAmountSelected, value) => {
        if (isAmountSelected) {
            price -= parseFloat(value);
        }
        else {
            price *= (1 - (value/100));
        }
    }

    const handlePO = () => {
        console.log(quoteInfo.id, quoteInfo.sale_id, quoteInfo.cust_id, price);
        postAPI('http://blitz.cs.niu.edu/PurchaseOrder/', 
         {
             'order': quoteInfo.id,
             'associate': quoteInfo.sale_id,
             'custid': quoteInfo.cust_id,
             'amount': price
         }
        ).then(data => console.log("PO processed and returned: ", data));
    }

    // setting up local variables for quote information for the modal
    let lineitems;
    let secretnotes;
    let discounts;
    let price;
    let status;
    if (quoteInfo) {
        lineitems = quoteInfo.line_items;
        secretnotes = quoteInfo.secretnotes;
        discounts = quoteInfo.discounts;
        price = 0;

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
                    // true block -> render the elements inside the modal
                    <div>
                        <h2>{`Quote for ${custInfo.name}`}</h2>
                        <p>{custInfo.street}</p>
                        <p>{custInfo.city}</p>
                        <p>{custInfo.contact}</p>

                        <p><b>Status:</b> {status}</p>

                        <h3>Customer Email Contact:</h3>
                        <input 
                            name="cust_email"
                            type="email"
                            value={quoteInfo.cust_email}
                            disabled
                        />
                        
                        <h3>Line Items:</h3>
                        <button 
                            name="newitem"
                            disabled
                        >
                            Add New Item
                        </button>
                        {lineitems.line_items.map((item, index) => {
                            calculateTotalPrice(item.price);
                            return (
                                    <div id={index} name="lineitem" >
                                        <input 
                                            name="description"
                                            minLength={3}
                                            type="text"
                                            value={item.description}
                                            disabled 
                                        />
                                        <input
                                            name="price"
                                            min={1}
                                            type="number"
                                            value={item.price}
                                            disabled
                                        />
                                        <button 
                                            name="lineitem"
                                            disabled
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
                            disabled
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
                                            disabled
                                        />
                                        <button 
                                            name="secretnote"
                                            disabled
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
                            name="newdiscount"
                            onClick={handleNewQuoteInfoEntry}
                        >
                            Add New Discount
                        </button>
                        {discounts.discounts.map((discount, index) => {
                            const isAmountSelected = discount.type === 'amount';
                            calculateDiscountPrice(isAmountSelected, discount.value);
                            return(
                                <div id={index}>
                                    <select id={`entryDiscountType`} onChange={handleDiscountTypeChange}>
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
                                        onChange={handleQuoteInfoInputChange}
                                        type="number"
                                        value={discount.value}
                                    />
                                    <button 
                                        name="discount"
                                        onClick={handleQuoteInfoItemDelete}
                                    >
                                        Delete
                                    </button>
                                </div>
                            );
                        })}


                        <br />

                        <h3>Total Price: ${price}</h3>

                        <br />
                        Update quote info here:
                        <button 
                            name="update"
                            onClick={updateQuoteInfoNSanction}
                        >
                           Update
                        </button>
                    </div>
                    // false block -> loading in a gif to show that the modal is loading the info in
                    : <img src={loadSpinner} alt={'loading...'} ></img>
                }

                <br />
                <hr />
                
                To convert this quote into an order and process it, click here: 
                <button onClick={handlePO}>
                    Process PO
                </button>
                <br/>

                <button onClick={handleClose}>
                    Close
                </button>
            </dialog>
            <button onClick={handleOpen}>
                Process Order
            </button>
        </div>
    );
};

export default PurchaseOrderModal;