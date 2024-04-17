import { useRef, useState, useEffect } from "react";
import loadSpinner from '../load.gif';
import { useNavigate } from "react-router-dom";
import { getAPI, postAPI, putAPI, authRouting } from "../APICallingUtilities";

const PurchaseOrderModal = ({ sanctionedQuotes, onUpdatePO }) => {

    /* API calls to get quote information + customer information */
    const [quoteInfo, setQuoteInfo] = useState({});
    const [custInfo, setCustInfo] = useState({});
    const [salesPerson, setSalesPerson] = useState({});
    const pageNavigator = useNavigate();

    // Loads quoteInfo and customerInfo DB
    const getQuoteInfo = async (quoteID, custID, salesID, salesPerson) => {
        try {
            const [quoteData, customerData] = await Promise.all([
                getAPI(`http://localhost:8050/quotes/info/${quoteID}/${custID}/${salesID}`, sessionStorage.getItem('UserAuth')),
                getAPI(`http://localhost:8050/customer/${custID}`, sessionStorage.getItem('UserAuth'))
            ]);

            authRouting(quoteData, pageNavigator); // function that checks if authorized or not
            authRouting(customerData, pageNavigator); // function that checks if authorized or not

            setQuoteInfo(quoteData[0]); // this api call should only return 1 item in array
            setCustInfo(customerData[0]); // this api call should only return 1 item in array
            setSalesPerson(salesPerson); // saves the salesperson name
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

        const keys = Object.keys(sanctionedQuotes[row_idx]);

        // Sending (QuoteID, CustID, SalesID, SalesPersonName) in Order
        getQuoteInfo(sanctionedQuotes[row_idx][keys[0]], sanctionedQuotes[row_idx][keys[1]], 
                        sanctionedQuotes[row_idx][keys[2]], sanctionedQuotes[row_idx][keys[4]]);
        
        // console.log("This is the User: ",sanctionedQuotes[row_idx][keys[4]]);
        dialog.current.showModal();
    }

    //closes dialog(modal)
    const handleClose = () => {
        dialog.current.close();
    }

    /* Functions for any discount changes */
    const updateQuoteDiscounts = (updatedDiscounts) => {
        setQuoteInfo(prevState => ({
            ...prevState,
            discounts: {
                discounts: updatedDiscounts
            }
        }));
    };

    // Delete a discount item
    const handleDiscountDeleteItem = (event) => {
        const idx = event.target.parentElement.id;

        const updatedDiscounts = [...discounts.discounts];
        updatedDiscounts.splice(idx, 1);
        updateQuoteDiscounts(updatedDiscounts);
    };

    // Add a new dicount item
    const handleDiscountNewItem = (event) => {
        const type = 'percent';
        const value = 1;

        const updatedDiscounts = [...discounts.discounts, { type, value }];
        updateQuoteDiscounts(updatedDiscounts);
    };

    // Change a discount item
    const handleDiscountItemChange = (event) => {
        const idx = event.target.parentElement.id;
        const inputValue = event.target.value;

        const updatedDiscounts = [...discounts.discounts];
        updatedDiscounts[idx] = { ...updatedDiscounts[idx], value: inputValue };
        updateQuoteDiscounts(updatedDiscounts);
    };

    // Change the type of discount item
    const handleDiscountTypeChange = (event) => {
        const idx = event.target.parentElement.id;
        const discountType = event.target.value;

        const updatedDiscounts = [...discounts.discounts];
        updatedDiscounts[idx] = { ...updatedDiscounts[idx], type: discountType };
        updateQuoteDiscounts(updatedDiscounts);
    };

    // updates Quote Discount in DB usng API call 
    // Note: should only be called when quoteInfo has been loaded (ie: modal fully rendered)
    const updateQuoteDiscount = (event) => {
        try {
            //const type = event.target.name;
            let DiscountNew = {
                ...quoteInfo,
                price
            };

            putAPI(
                `http://localhost:8050/quotes/updateInfo/${quoteInfo.id}/${quoteInfo.cust_id}/${quoteInfo.sale_id}`,
                DiscountNew,
                sessionStorage.getItem('UserAuth')
            )
                .then(data => {
                    authRouting(data, pageNavigator); // function that checks if authorized or not

                    // send info to POInterface that db has been updated so that it rerenders its table
                    onUpdatePO();
                })
        }
        catch (error) {
            console.log('PurchaseOrderModal.jsx - Error:', error);
        }
    }

    // calculates total price for html part (check below return statement)
    const calculateTotalPrice = (value) => {
        price += parseFloat(value);
    }

    // calculates total discount for html part (check below return statement)
    const calculateDiscountPrice = (isAmountSelected, value) => {
        if (isAmountSelected) {
            price -= parseFloat(value);
        }
        else {
            price *= (1 - (value / 100));
        }
    }

    // Function to calculate total comission of the sale associate after processing PO
    function computeCommission(commissionPercentage, amount) {

        // Convert commission percentage from string to number and remove '%' if present
        const percentage = parseFloat(commissionPercentage.replace('%', ''));

        // Check if the conversion was successful
        if (isNaN(percentage)) {
            return "Invalid commission percentage";
        }

        // Calculate commission amount
        let commission = (percentage / 100) * amount;

        // Round off the commission to two digits after the decimal point
        commission = Math.round(commission * 100) / 100;

        return commission;
    }

    const handlePO = () => {
        postAPI('http://blitz.cs.niu.edu/PurchaseOrder/',
            {
                'order': quoteInfo.id,
                'associate': quoteInfo.sale_id,
                'custid': quoteInfo.cust_id,
                'amount': price
            }
        ).then(data => {
            if (data.errors) {
                console.log("External Processing Failed, error: ", data.errors[0]);
            }
            else {
                console.log("PO processed and returned: ", data);

                const commission = computeCommission(data.commission, data.amount);
                const message = 'Purchase Order has been processed for ' + data.processDay
                    + '.\n' + 'Commission of ' + commission + ' has been credited to '+ salesPerson;

                // show message to user that updated quote info email has been sent!
                window.alert(message);

                //close modal after submission
                dialog.current.close();

                // send info to StaffInterface that db has been updated so that it rerenders its table
                onUpdatePO();
            }
        });
    }

    // setting up local variables for quote information for the modal
    let lineitems, secretnotes, discounts, price, status;

    if (quoteInfo) {
        lineitems = quoteInfo.line_items;
        secretnotes = quoteInfo.secretnotes;
        discounts = quoteInfo.discounts;
        price = 0;
        status = quoteInfo.is_sanctioned ? 'Sanctioned' : (quoteInfo.is_finalized ? 'Finalized' : 'In Review');
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
                            onClick={handleDiscountNewItem}
                        >
                            Add New Discount
                        </button>
                        {discounts.discounts.map((discount, index) => {
                            const isAmountSelected = discount.type === 'amount';
                            calculateDiscountPrice(isAmountSelected, discount.value);
                            return (
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
                                        onChange={handleDiscountItemChange}
                                        type="number"
                                        value={discount.value}
                                    />
                                    <button
                                        name="discount"
                                        onClick={handleDiscountDeleteItem}
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
                            onClick={updateQuoteDiscount}
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
                <br />

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