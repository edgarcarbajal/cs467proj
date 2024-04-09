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


    useEffect(() => {
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
    }, [])

    return (
        <div>
            <Link to={'/'}>
                <button>Return to main page!</button>
            </Link>
            <p>hello testing StaffInterface component</p>

            <h1>Finalized/Sanctioned Quotes</h1>

            {finalizedQuotes &&
                <div>
                    <TableView styling={tableTempStyle} tableItems={finalizedQuotes} dialog={<QuoteInfoModal quotes={finalizedQuotes} />} />
                    <p>{`Total of ${finalizedQuotes?.length} quotes`}</p>
                </div>    
            }

        </div>
    );
};

export default StaffInterface;