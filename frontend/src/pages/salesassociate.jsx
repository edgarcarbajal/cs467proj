import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { getAPI, authRouting } from '../APICallingUtilities';
import TableView from '../components/TableView';
import QuoteInfoModal from '../components/QuoteInfoModal';
//import './sales_styles.css'; // Import your CSS file

 const QuoteTrackingProgram = () => {
    // temporary table style (will change later)
    const tableTempStyle = {
        border: '1px solid black'
    }

    const [reviewQuotes, setReviewQuotes] = useState([]);
    const [hasQuoteUpdated, setHasQuoteUpdated] = useState(false);
    const pageNavigator = useNavigate();


    // code under here runs whenever state is updated
    useEffect(() => {
      if (hasQuoteUpdated)
            setHasQuoteUpdated(false); // reset the value
      try {
          getAPI('http://localhost:8050/quotes/in-review', sessionStorage.getItem('UserAuth'))
            .then(data => {
                authRouting(data, pageNavigator);
                setReviewQuotes(data)
          });
      }
      catch(error) {
          console.log('saleassoicate.jsx - Error:', error);
      }
    }, [hasQuoteUpdated, pageNavigator]) // <-- update the state/recall api again when quote has been updated in db!


    return (
      <div>
        <h1>Welcome to the Green House Quote System</h1>
        <Link to={'/'}>
                <button>Return to main page!</button>
            </Link>
          <h2>Create new quote for Customer</h2>
          <p>Select Customer:</p>
          <div>
            <form name="customer" id="customer" action="/customer.js">
              <select name="Select Customer" id="select">
                <option value ="" selected="selected">Please Select One</option>
              </select>
             <button>New quote
              <TableView 
                        styling={tableTempStyle}
                        tableItems={reviewQuotes}
                        dialog={
                            <QuoteInfoModal 
                                quotes={reviewQuotes}
                                onUpdateQuote={() => setHasQuoteUpdated(true)}
                            />
                        } 
                    />
              </button>
            </form>
            </div>     
         <br />
       <h3>List of current quotes:</h3>
          <div>
                    <TableView 
                        styling={tableTempStyle}
                        tableItems={reviewQuotes}
                        dialog={
                            <QuoteInfoModal 
                                quotes={reviewQuotes}
                                onUpdateQuote={() => setHasQuoteUpdated(true)}
                            />
                        } 
                    />
           <br></br>
                    <p>Amount: ${reviewQuotes?.length}
                    <div>
                      <Link to={'/'}> 
                        <button>Create</button>
                      </Link>
                    </div>
                    </p>
                </div>
          <br></br>
                <p>To finalize this quote and submit it to processing in headquarters, click here:
                <input type="submit" name="submit" value="Submit" />
                </p> 
      </div>
    );
  }


export default QuoteTrackingProgram;

