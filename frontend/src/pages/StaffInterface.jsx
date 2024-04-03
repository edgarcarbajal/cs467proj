import { Link } from 'react-router-dom';
import { getAPI } from '../testAPIcalling';
import { useEffect, useState } from 'react';


const StaffInterface = () => {
    // let finalizedQuotes = [];
    // try {
    //     getAPI('http://localhost:8050/quotes/sanctioned')
    //         .then(data => {
    //             //console.log(data)
    //             finalizedQuotes = data;
    //         })
    // }
    // catch(error) {
    //     console.log('StaffInterface.jsx - Error:', error);
    // }

    // temporary table style (will change later)
    const tableTempStyle = {
        border: '1px solid black'
    }

    const [finalizedQuotes, setFinalizedQuotes] = useState([]);

    useEffect(() => {
        try {
            getAPI('http://localhost:8050/quotes/sanctioned')
                .then(data => {
                    console.log(data)
                    setFinalizedQuotes(data)
                })
        }
        catch(error) {
            console.log('StaffInterface.jsx - Error:', error);
            setFinalizedQuotes([]);
        }
    }, [])

    return (
        <div>
            <Link to={'/'}>
                <button>Return to main page!</button>
            </Link>
            <p>hello testing StaffInterface component</p>

            <h1>Finalized/Sanctioned Quotes</h1>
            <table style={tableTempStyle}>
                <thead>
                    {finalizedQuotes?.length && // <-- basically an ifstatement to check if finalizedQuotes array exists/initialized
                        Object.keys(finalizedQuotes[0]).map((key) => 
                            <th 
                                key={key}
                                style={tableTempStyle}
                            >
                                {key}
                            </th>
                        )
                    }
                </thead>
                <tbody>
                {finalizedQuotes?.length &&
                    finalizedQuotes.map((quote) => {
                        console.log(quote);
                        return(
                            <tr 
                                key={quote.id} 
                                style={tableTempStyle} 
                            >
                                {Object.keys(quote).map((key) => 
                                    <td 
                                        key={key}
                                        style={tableTempStyle} 
                                    >
                                        {quote[key]}
                                    </td>
                                )}
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </div>
    );
};

export default StaffInterface;