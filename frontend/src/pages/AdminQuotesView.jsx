import { useEffect, useState } from "react";
import { authRouting, getAPI, putAPI } from "../APICallingUtilities";
import { useNavigate } from "react-router-dom";
import TableView from "../components/TableView";
import AdminQuoteModal from "../components/AdminQuoteModal";


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
    }, [queryInfo, pageNavigator]);


    const handleInputChanges = (event) =>{
        const type = event.target.id;
        const inputValue = event.target.value;

        if (type === 'startDate') {
            setQueryInfo({
                ...queryInfo,
                startDate: inputValue
            });
        }
        else if (type === 'endDate') {
            setQueryInfo({
                ...queryInfo,
                endDate: inputValue
            });
        }
        else if (type === 'status') {
            setQueryInfo({
                ...queryInfo,
                status: inputValue
            });
        }
        else if (type === 'associate') {
            setQueryInfo({
                ...queryInfo,
                associate: inputValue
            });
        }
        else if (type === 'customer') {
            setQueryInfo({
                ...queryInfo,
                customer: inputValue
            });
        }
    }

    return (
        <div>
            <h2>List of all quotes:</h2>

            {(customers?.length > 0 && salesAssociates?.length > 0) ? 
                <div>
                    <label htmlFor="startDate">Date from:</label>
                    <input 
                        id="startDate"
                        min={'2024-01-01'}
                        onChange={handleInputChanges}
                        type="date"
                        value={queryInfo.startDate}
                    />

                    <label htmlFor="endDate">to:</label>
                    <input 
                        id="endDate"
                        min={'2024-01-02'}
                        onChange={handleInputChanges}
                        type="date"
                        value={queryInfo.endDate}
                    />

                    <br />

                    <label htmlFor="status">Status:</label>
                    <select 
                        id="status"
                        onChange={handleInputChanges}
                    >
                        <option value={'all'}>all</option>
                        <option value={'open'}>open</option>
                        <option value={'finalized'}>finalized</option>
                        <option value={'sanctioned'}>sanctioned</option>
                        <option value={'ordered'}>ordered</option>
                    </select>

                    <label htmlFor="associate">Select Associate:</label>
                    <select 
                        id="associate"
                        onChange={handleInputChanges}
                    >
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
                    <select 
                        id="customer"
                        onChange={handleInputChanges}
                    >
                        <option value={'all'}>all</option>
                        {customers.map(customer => {
                            return (
                                <option value={customer.id}>
                                    {customer.name}
                                </option>
                            );
                        })}
                    </select>
                </div>

                : <div>
                    <h3>Could not load in customer and/or sales associate names!</h3>
                    <p>Please check with system admin to troubleshoot or come back later!</p>
                </div>
            }

            {quotes?.length > 0 &&
                <div className="flex flex-col p-8">
                    <TableView 
                        tableItems={quotes}
                        dialog={<AdminQuoteModal adminQuotes={quotes}/>}
                    />
                </div>
            }

            <br />
            <hr />
            <p><b>{quotes ? quotes.length : 'No'} quotes found</b></p>
            <br />
            <br />
        </div>
    );
}


export default AdminQuotesView;