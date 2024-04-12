/* Should only accept 3 props!
    tableItems --> An array of JS objects (i.e. JSON)
    button ? --> A button component (if exists)
    styling --> CSS styling!
*/ 
const TableView = (props) => {
    let {
        styling,
        tableItems,
        dialog
    } = props;


    if (dialog && tableItems) {
        tableItems = tableItems.map((item) => {
            return {
                ...item,
                Action: dialog
            };
        });
        console.log(tableItems);
    }

    return (
        <table style={styling}>
            <thead>
                {tableItems?.length && // <-- basically an ifstatement to check if tableItems array exists/initialized
                    Object.keys(tableItems[0]).map((key, index) => 
                        <th 
                            id={index}
                            key={key}
                            style={styling}
                        >
                            {key}
                        </th>
                    )
                }
            </thead>
            <tbody>
            {tableItems?.length &&
                tableItems.map((item, index) => {
                    //console.log(item);
                    return(
                        <tr 
                            id={index}
                            key={item.id} 
                            style={styling} 
                        >
                            {Object.keys(item).map((key, index) => 
                                <td 
                                    id={index}
                                    key={key}
                                    style={styling} 
                                >
                                    {item[key]}
                                </td>
                            )}
                        </tr>
                    );
                })
            }
            </tbody>
        </table>
    );
};

export default TableView;