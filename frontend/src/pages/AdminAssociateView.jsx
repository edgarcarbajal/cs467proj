import { useEffect, useState } from "react";
import { getAPI,authRouting, deleteAPI, postAPI } from "../APICallingUtilities";
import { useNavigate } from "react-router-dom";
import '../css_files/LoginPage.css';
import '../css_files/App.css';
import TableView from "../components/TableView";
import SalesAssociateModal from "../components/SalesAssociateModal";



const AdminAssociateView = () => {
    const pageNavigator = useNavigate();
    const [salesAssociates, setSalesAssociates] = useState([])
    const [newSaleAssociate, setNewSalesAssociates] = useState({})
    const [hasAssociateUpdated, setHasAssociateUpdated] = useState(false);

    useEffect(() => { 
        if (hasAssociateUpdated)
            setHasAssociateUpdated(false);

        try {
            getAPI('http://localhost:8050/salesAssociate', sessionStorage.getItem('UserAuth'))
                .then(data => {
                    authRouting(data, pageNavigator); // function that checks if authorized or not
                    setSalesAssociates(data)
                });
        }
        catch(error) {
            console.log('adminInterface.jsx - Error:', error);
        }
    },[hasAssociateUpdated, pageNavigator])

    const handledelete = (event) => {
        const index = event.target.parentElement.parentElement.id
        //console.log(salesassociates[index])

        if (window.confirm(`You are deleting the Sales Associate "${salesAssociates[index]['Sales Associate']}"\nThis will delete all quotes and purchase orders that this associate has made from the database!\n\nAre you sure you want to continue?`)) {
            deleteAPI(`http://localhost:8050/salesAssociate/delete/${salesAssociates[index].id}`, sessionStorage.getItem('UserAuth'))
                .then(data => {
                    authRouting(data, pageNavigator); 
                    console.log(data)

                    setHasAssociateUpdated(true);
                })
        }
    }

    const createNewSalesAssociates = () => {

        postAPI('http://localhost:8050/salesAssociate/newSalesAssociate', newSaleAssociate, sessionStorage.getItem('UserAuth'))

        .then(data => {
            authRouting(data, pageNavigator);
            console.log(data)
            setNewSalesAssociates({
                username: '',
                password: '',
            });

            setHasAssociateUpdated(true);
        })
    }

    const handleUsernameChange = (event) => {
        const inputValue = event.target.value
        setNewSalesAssociates({
            ...newSaleAssociate, 
            username: inputValue
        })

    }

    const handlePasswordChange = (event) => {
        const inputValue = event.target.value
        setNewSalesAssociates({
            ...newSaleAssociate, 
            password: inputValue
        })


    }
    

 return (
    <div>
        <h2>Sales Associate Admin View</h2>
        {salesAssociates?.length > 0 ? // if-statement to render TableView (which is dependent on finalizedQuotes)
            // true-block
            <div className="flex flex-col p-8">
                <TableView 
                    tableItems={salesAssociates}
                    deleteaction={
                        <button 
                            className="subLinkRed"
                            onClick={handledelete}
                        >
                            Delete
                        </button>
                    }
                    dialog={
                        <SalesAssociateModal 
                            salesAssociates={salesAssociates}
                            onUpdateAssociate={() => setHasAssociateUpdated(true)}
                        />
                    }
                />
                <p>{` ${salesAssociates?.length} associates found`}</p>
            </div>
            // false-block
            : <div> 
                <p>No sale associates!</p>
                <p>Please check back later, or contact an administrator if you believe there is an error.</p>
            </div>   
        }
        <div className="px-4">
            <br />
            <hr />
            <br />

            <h2>Add New Sales Associates</h2>
            <label htmlFor="Username">Username:</label>
            
            <input 
                value={newSaleAssociate.username}
                type="text" 
                id="Username" 
                placeholder='Username'
                onChange={handleUsernameChange}
                
            />
            <label htmlFor="Password">Password:</label>
            <input 
                value={newSaleAssociate.password}
                type="Password" 
                id="Password" 
                placeholder='Password'
                onChange={handlePasswordChange}
            />

            <button type='submit' value='send' className="mainLink" onClick={createNewSalesAssociates}>Submit</button>

            <br />
            <br />
        </div>
    </div>
 );


}

export default AdminAssociateView;