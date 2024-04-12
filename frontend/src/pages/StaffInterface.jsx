import { Link } from 'react-router-dom';
import { getAPI } from '../testAPIcalling';
import { useEffect, useState } from 'react';
import TableView from '../components/TableView';
import QuoteInfoModal from '../components/QuoteInfoModal';


const StaffInterface = () => {
    // temporary table style (will change later)
    const tableTempStyle = {
        border: '1px solid black'
    }

    const [finalizedQuotes, setFinalizedQuotes] = useState([]);
    const [hasQuoteUpdated, setHasQuoteUpdated] = useState(false);


    // code under here runs whenever state is updated
    useEffect(() => {
        console.log('StaffInterface useEffect running!')
        if (hasQuoteUpdated)
            setHasQuoteUpdated(false); // reset the value

        try {
            getAPI('http://localhost:8050/quotes/finalized')
                .then(data => {
                    console.log(data)
                    setFinalizedQuotes(data)
                });
        }
        catch(error) {
            console.log('StaffInterface.jsx - Error:', error);
        }
    }, [hasQuoteUpdated]) // <-- update the state/recall api again when quote has been updated in db!

    return (
        <div>
            <Link to={'/'}>
                <button>Return to main page!</button>
            </Link>
            <p>hello testing StaffInterface component</p>

            <h1>Finalized Quotes</h1>

            {finalizedQuotes?.length > 0 ? // if-statement to render TableView (which is dependent on finalizedQuotes)
                // true-block
                <div>
                    <TableView 
                        styling={tableTempStyle}
                        tableItems={finalizedQuotes}
                        dialog={
                            <QuoteInfoModal 
                                quotes={finalizedQuotes}
                                onUpdateQuote={() => setHasQuoteUpdated(true)}
                            />
                        } 
                    />
                    <p>{`Total of ${finalizedQuotes?.length} quotes`}</p>
                </div>
                // false-block
                : <div> 
                    <p>No available quotes here!</p>
                    <p>Please check back later, or contact an administrator if you believe there is an error.</p>
                </div>   
            }

        </div>
    );
};

export default StaffInterface;