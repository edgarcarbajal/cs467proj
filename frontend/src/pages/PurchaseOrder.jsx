import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { getAPI, authRouting } from '../APICallingUtilities';
import TableView from '../components/TableView';
import PurchaseOrderModal from '../components/PurchaseOrderModal';
// import QuoteInfoModal from '../components/QuoteInfoModal';

function PurchaseOrder() {

  // temporary table style (will change later)
  const tableTempStyle = {
    border: '1px solid black'
  }

  const [sanctionedQuotes, setSanctionedQuotes] = useState([]);
  const [hasPOUpdated, setHasPOUpdated] = useState(false);
  const pageNavigator = useNavigate();


  // code under here runs whenever state is updated
  useEffect(() => {

    if (hasPOUpdated)
      setHasPOUpdated(false); // reset the value

    try {
      getAPI('http://localhost:8050/quotes/sanctioned', sessionStorage.getItem('UserAuth'))
      .then(data => {
        authRouting(data, pageNavigator); // function that checks if authorized or not
        setSanctionedQuotes(data);
      })
    }
    catch (error) {
      console.log('PurchaseOrder.jsx - Error:', error);
    }
  }, [hasPOUpdated, pageNavigator]); // <-- update the state/recall api again when quote has been updated in db!

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
                sanctionedQuotes={sanctionedQuotes}
                onUpdatePO={() => setHasPOUpdated(true)}
              />
              // <QuoteInfoModal 
              //   quotes={sanctionedQuotes}
              //   onUpdateQuote={() => setHasQuoteUpdated(true)}
              // />
            }
          />
          <p>{`Total of ${sanctionedQuotes?.length} sanctioned quotes`}</p>
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
