import { useEffect, useState } from "react";
import { getAPI,authRouting, deleteAPI, postAPI } from "../APICallingUtilities";
import { useNavigate } from "react-router-dom";
import '../css_files/LoginPage.css';
import '../css_files/App.css';
import TableView from "../components/TableView";
import SalesAssociateModal from "../components/SalesAssociateModal";



const AdminInterface = () => {
    const pageNavigator = useNavigate();
    const [salesassociates, setsalesassociates] = useState([])
    const [newSaleAssociate, setNewSalesAssociates] = useState({})
    const [hasAssociateUpdated, setHasAssociateUpdated] = useState(false);

    useEffect(() => { 
        if (hasAssociateUpdated)
            setHasAssociateUpdated(false);

        try {
            getAPI('http://localhost:8050/salesAssociate', sessionStorage.getItem('UserAuth'))
                .then(data => {
                    authRouting(data, pageNavigator); // function that checks if authorized or not
                    setsalesassociates(data)
                });
        }
        catch(error) {
            console.log('adminInterface.jsx - Error:', error);
        }
    },[hasAssociateUpdated])

    const handledelete = (event) => {

       const index = event.target.parentElement.parentElement.id
        console.log(salesassociates[index])

        deleteAPI(`http://localhost:8050/salesAssociate/delete/${salesassociates[index].id}`, sessionStorage.getItem('UserAuth'))
        .then(data => {
            authRouting(data, pageNavigator); 
            console.log(data)

            setHasAssociateUpdated(true);
        })
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
        <h1>Admin Interface</h1>
    
        {salesassociates?.length > 0 ? // if-statement to render TableView (which is dependent on finalizedQuotes)
            // true-block
            <div>
                <TableView 
                    tableItems={salesassociates}
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
                            salesAssociates={salesassociates}
                            onUpdateAssociate={() => setHasAssociateUpdated(true)}
                        />
                    }
                />
                <p>{` ${salesassociates?.length} associates found`}</p>
            </div>
            // false-block
            : <div> 
                <p>No sale associates!</p>
                <p>Please check back later, or contact an administrator if you believe there is an error.</p>
            </div>   
        }
        <div>
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

export default AdminInterface;