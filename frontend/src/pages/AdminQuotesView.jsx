import { useEffect, useState } from "react";
import { authRouting, getAPI, putAPI } from "../APICallingUtilities";
import { useNavigate } from "react-router-dom";
import TableView from "../components/TableView";


const AdminQuotesView = () => {
    const [queryInfo, setQueryInfo] = useState({
        startDate: '2024-01-01',
        endDate: '2025-01-01',
        status: 'all',
        associate: 'all',
        customer: 'all'
    });
    const [salesAssociates, setSalesAssociates] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [quotes, setQuotes] = useState([]);
    const pageNavigator = useNavigate();

    useEffect(() => {
        try {
            getAPI('http://localhost:8050/salesAssociate/', sessionStorage.getItem('UserAuth'))
              .then(data => {
                    console.log(data)
                    authRouting(data, pageNavigator);
                    setSalesAssociates(data)
            });
  
            getAPI('http://localhost:8050/customer/names', sessionStorage.getItem('UserAuth'))
              .then(data => {
                    console.log(data)
                    authRouting(data, pageNavigator);
                    setCustomers(data);
              })

            putAPI('http://localhost:8050/quotes/adminQuotes', queryInfo, sessionStorage.getItem('UserAuth'))
                .then(data => {
                    console.log(data);
                    setQuotes(data);
                });
        }
        catch(error) {
            console.log('saleassoicate.jsx - Error:', error);
        }
    }, [pageNavigator]);

    return (
        <div>
            <h2>List of all quotes:</h2>

            <label htmlFor="startDate">Date from:</label>
            <input 
                id="startDate"
                min={'2024-01-01'}
                type="date"
                value={'2024-01-01'}
            />

            <label htmlFor="endDate">to:</label>
            <input 
                id="endDate"
                min={'2024-01-02'}
                type="date"
                value={'2024-01-02'}
            />

            <br />

            <label htmlFor="status">Status:</label>
            <select id="status">
                <option value={'all'}>all</option>
                <option value={'finalized'}>finalized</option>
                <option value={'sanctioned'}>sanctioned</option>
                <option value={'ordered'}>ordered</option>
            </select>

            <label htmlFor="associate">Select Associate:</label>
            <select id="status">
                <option value={'all'}>all</option>
                {salesAssociates.map(associate => {
                    return (
                        <option value={associate.id}>
                            {associate.name_associate}
                        </option>
                    );
                })}
            </select>

            <label htmlFor="customer">Select customer:</label>
            <select id="status">
                <option value={'all'}>all</option>
                {customers.map(customer => {
                    return (
                        <option value={customer.id}>
                            {customer.name}
                        </option>
                    );
                })}
            </select>
            <br />
            <br />

            {quotes &&
                <TableView 
                    tableItems={quotes}
                />
            }
        </div>
    );
}


export default AdminQuotesView;