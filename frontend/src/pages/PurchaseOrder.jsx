import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getAPI } from '../testAPIcalling';
import TableView from '../components/TableView';
import PurchaseOrderModal from '../components/PurchaseOrderModal';
// import QuoteInfoModal from '../components/QuoteInfoModal';

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
    catch (error) {
      console.log('PurchaseOrder.jsx - Error:', error);
    }
  }, [hasQuoteUpdated]); // <-- update the state/recall api again when quote has been updated in db!

  return (
    <div>
      <h1>PURCHASE ORDER</h1>
      <h2>List of Sanctioned Quotes</h2>
      {sanctionedQuotes?.length > 0 ? // if-statement to render TableView (which is dependent on finalizedQuotes)
        // true-block
        <div>
          <TableView
            styling={tableTempStyle}
            tableItems={sanctionedQuotes}
            dialog={
              <PurchaseOrderModal
                quotes={sanctionedQuotes}
                onUpdateQuote={() => setHasQuoteUpdated(true)}
              />
              // <QuoteInfoModal 
              //   quotes={sanctionedQuotes}
              //   onUpdateQuote={() => setHasQuoteUpdated(true)}
              // />
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
      <br />

      <Link to={'/'}>
        <button>Return to main page!</button>
      </Link>
    </div>
  );
};

export default PurchaseOrder;
