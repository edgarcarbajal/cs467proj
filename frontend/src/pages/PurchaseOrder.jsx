import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getAPI, postAPI } from '../testAPIcalling';
import TableView from '../components/TableView';
import QuoteInfoModal from '../components/QuoteInfoModal';

function PurchaseOrder() {  

  // temporary table style (will change later)
  const tableTempStyle = {
    border: '1px solid black'
  }

  const [sanctionedQuotes, getSanctionedQuotes] = useState([]);
  const [hasQuoteUpdated, setHasQuoteUpdated] = useState(false);

  // code under here runs whenever state is updated
  useEffect(() => {

    if (hasQuoteUpdated)
            setHasQuoteUpdated(false); // reset the value
          
    try {
      getAPI('http://localhost:8050/quotes/sanctioned')
      .then(data => {
        getSanctionedQuotes(data);
      })
    }
    catch(error) {
      console.log('PurchaseOrder.jsx - Error:', error);
    }
  }, [hasQuoteUpdated]); // <-- update the state/recall api again when quote has been updated in db!

  function processPurchaseOrder() {
    // postAPI('http://blitz.cs.niu.edu/PurchaseOrder/', 
    //   {
    //     'order': sanctionedQuotes.at(0).id,
    //     'associate': sanctionedQuotes.at(0).sale_id,
    //     'custid': sanctionedQuotes.at(0).cust_id,
    //     'amount': sanctionedQuotes.at(0).line_items[1]
    //   }
    // ).then(data => console.log(data));
  };

  // const date = new Date().toDateString();
  return (
    <div>
      <h1>PURCHASE ORDER</h1>
      <p>
        <h2>List of Sanctioned Quotes</h2>
        {sanctionedQuotes?.length > 0 ? // if-statement to render TableView (which is dependent on finalizedQuotes)
          // true-block
          <div>
            <TableView 
              styling={tableTempStyle}
              tableItems={sanctionedQuotes}
              dialog={
                <QuoteInfoModal 
                  quotes={sanctionedQuotes}
                  onUpdateQuote={() => setHasQuoteUpdated(true)}
                />
              } 
            />
            <p>{`Total of ${sanctionedQuotes?.length} quotes`}</p>
          </div>
          
          // false-block
          : <div> 
              <p>No available quotes here!</p>
              <p>Please check back later, or contact an administrator if you believe there is an error.</p>
            </div>   
        }
      </p>

      <button onClick={processPurchaseOrder}>Submit Purchase Order </button>
      <br />
      <Link to={'/'}>
        <button>Return to main page!</button>
      </Link>
    </div>
  );
};

export default PurchaseOrder;
