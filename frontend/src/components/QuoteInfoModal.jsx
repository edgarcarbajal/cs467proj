import { useRef, useState } from "react";
import { getAPI, postAPI, putAPI } from "../APICallingUtilities";
import loadSpinner from '../load.gif';

/*
    Only 1 prop for this component! (for now)
    isOpen --> bool that describes whether dialog is open or not!
*/
const QuoteInfoModal = ({quotes, onUpdateQuote}) => {

    // useState vars - Used to rerender the component when any of the contents of these variables change
    const [quoteInfo, setQuoteInfo] = useState({});
    const [custInfo, setCustInfo] = useState({});
    //const [discountedPrice, setDiscountedPrice] = useState(0.0);

    // API calls to get quote information + customer information
    const getQuoteInfo = (quoteID, salesID, custID) => {
        try {
            console.log(quoteID, salesID, custID);
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
            console.log('QuoteInfoModal.jsx - Error:', error);
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

            // update sanction value if we are also sanctioning (ie: hitting the "Sanction Quote" button)
            if (type === 'sanction')
                newQuoteInfo = {
                    ...newQuoteInfo,
                    is_sanctioned: true
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
                window.alert(`Updated quote information send to customer at the email: ${newQuoteInfo.cust_email}`);

                //close modal after submission
                dialog.current.close();

                // send info to StaffInterface that db has been updated so that it rerenders its table
                onUpdateQuote();
            })
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
    const handleQuoteInfoItemDelete = (event) => {
        const idx = event.target.parentElement.id;
        const type = event.target.name;


        if (type === 'secretnote') {
            secretnotes.secretnotes.splice(idx, 1);

            // save changes done to the quote info
            setQuoteInfo(
                {
                    ...quoteInfo, // spread all attributes of old object to new object
                    secretnotes: { // update the attribute with the same name to the value below
                        "secretnotes": secretnotes.secretnotes
                    }
                }
            );
        }
        else if(type === 'lineitem') {
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
        else {
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

        if (inputType === 'newitem') {
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
        else if(inputType === 'newnote'){
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
        else {
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


        if (itemAttribute === 'description' || itemAttribute === 'price') {
            // update local array
            lineitems.line_items[idx] = {
                ...lineitems.line_items[idx],
                [itemAttribute]: inputvalue // get string in itemAttribute and make that the key of the attribute
            }

            // update state(website view)
            setQuoteInfo(
                {
                    ...quoteInfo,
                    line_items: {
                        "line_items": lineitems.line_items
                    }
                }
            );
        } 
        else if(itemAttribute === 'note') {
            // update local array
            secretnotes.secretnotes[idx] = inputvalue;

            // update state(website view)
            setQuoteInfo(
                {
                    ...quoteInfo,
                    secretnotes: {
                        "secretnotes": secretnotes.secretnotes
                    }
                }
            );
        }
        else if(itemAttribute === 'discount'){
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
        else {
            setQuoteInfo(
                {
                    ...quoteInfo,
                    cust_email: inputvalue
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

    console.log(lineitems);
    console.log(secretnotes);
    console.log(custInfo);
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
                            onChange={handleQuoteInfoInputChange}
                            value={quoteInfo.cust_email}
                        />
                        
                        <h3>Line Items:</h3>
                        <button 
                            name="newitem"
                            onClick={handleNewQuoteInfoEntry}
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
                                            onChange={handleQuoteInfoInputChange}
                                            type="text"
                                            value={item.description} 
                                        />
                                        <input
                                            name="price"
                                            min={1}
                                            onChange={handleQuoteInfoInputChange}
                                            type="number"
                                            value={item.price}
                                        />
                                        <button 
                                            name="lineitem"
                                            onClick={handleQuoteInfoItemDelete}
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
                            onClick={handleNewQuoteInfoEntry}
                        >
                            Add New Note
                        </button>
                        {secretnotes.secretnotes.map((note, index) => {
                            return (
                                    <div id={index} name="secretnote" >
                                        <input 
                                            name="note"
                                            onChange={handleQuoteInfoInputChange}
                                            type="text"
                                            value={note}
                                        />
                                        <button 
                                            name="secretnote"
                                            onClick={handleQuoteInfoItemDelete}
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
                        <button 
                            name="update"
                            onClick={updateQuoteInfoNSanction}
                        >
                            Update
                        </button>

                        <br />
                        <p>To update and also sanction this quote click here: </p>
                        <button 
                            name="sanction"
                            onClick={(event) => {
                                const selection = window.confirm('This quote will now be sanctioned.\nQuote information will no longer be editable!\n\nDo you wish to continue?');
                                if(selection)
                                    updateQuoteInfoNSanction(event);
                            }}
                        >
                            Sanction Quote
                        </button>
                    </div>
                    // false block -> loading in a gif to show that the modal is loading the info in
                    : <img src={loadSpinner} alt={'loading...'} ></img>
                }

                <br />
                <br />
                <hr />
                
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