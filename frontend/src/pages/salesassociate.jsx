import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getAPI, authRouting } from '../APICallingUtilities';
import TableView from '../components/TableView';
import QuoteInfoModal from '../components/QuoteInfoModal';
import '../css_files/App.css';

const QuoteTrackingProgram = () => {
    const [reviewQuotes, setReviewQuotes] = useState([]);
    const [customers, setCustomers] = useState([]);
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

          getAPI('http://localhost:8050/customer/names', sessionStorage.getItem('UserAuth'))
            .then(data => {
              authRouting(data, pageNavigator);
              setCustomers(data);
            })
      }
      catch(error) {
          console.log('saleassoicate.jsx - Error:', error);
      }
    }, [hasQuoteUpdated, pageNavigator]) // <-- update the state/recall api again when quote has been updated in db!


    return (
      <div>
        <h2>In-Review Quotes</h2>

        {customers?.length > 0 && 
          <div>
            <label htmlFor="customers">Select a customer:</label>
            <select id="customers">
              {customers.map(customer => {
                return (
                  <option 
                    value={customer.id}
                  >
                    {customer.name}
                  </option>
                );
              })}
            </select>

            <QuoteInfoModal 
                isCreatingQuote={true}
                onUpdateQuote={() => setHasQuoteUpdated(true)}
            />
            <p>{customers.length} current customers</p>
          </div>
        }

        {reviewQuotes?.length > 0 ? 
        // true-block
          <div>
            <TableView 
              tableItems={reviewQuotes}
              dialog={
                <QuoteInfoModal
                    isHQInterface={false}
                    isCreatingQuote={false}
                    quotes={reviewQuotes}
                    onUpdateQuote={() => setHasQuoteUpdated(true)}
                />
              }
            />
          </div>
          // false-block
          : <div> 
            <p>No available quotes here!</p>
            <p>Please check back later, or contact an administrator if you believe there is an error.</p>
          </div>   
        }
      </div>
    );
  }


export default QuoteTrackingProgram;

