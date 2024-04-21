import { useRef, useState } from 'react';
import '../css_files/App.css';
import loadSpinner from '../load.gif';
import { getAPI, putAPI } from '../APICallingUtilities';

const SalesAssociateModal = ({salesAssociates, onUpdateAssociate}) => {
    const [salesAssociateInfo, setSalesAssociateInfo] = useState({});


    // reference to dialog element HTML tag
    const dialog = useRef();
    // opens dialog in modal mode + also fetches data from database about the quote info(may change this later??)
    const handleOpen = (event) => {
        const row_idx = event.target.parentElement.parentElement.parentElement.id; // 3 parent elements: div from QuoteInfoModal -> td (column) -> tr (row)
        const saleID = salesAssociates[row_idx].id;

        getAPI(`http://localhost:8050/salesAssociate/info/${saleID}`, sessionStorage.getItem('UserAuth'))
            .then(data => {
                console.log(data);
                setSalesAssociateInfo({
                    ...data[0],
                    password: ''
                });
            })
        dialog.current.showModal();
    }


    const handleInputChange = (event) => {
        const valueType = event.target.id;
        const value = event.target.value
        
        setSalesAssociateInfo({
            ...salesAssociateInfo,
            [valueType]: value
        });
    }

    const updateAssociateInfo = () => {
        putAPI('http://localhost:8050/salesAssociate/updateInfo', salesAssociateInfo, sessionStorage.getItem('UserAuth'))
            .then(data => {
                console.log(data);

                // close modal
                dialog.current.close()

                //update table view!
                onUpdateAssociate();
            });
    }


    return (
        <div>
            <dialog
                className="w-6/12"
                ref={dialog}
            >
                {salesAssociateInfo ? // if-statement
                    // true block -> render the elements inside the modal
                    <div>
                        <h3>Edit Associate: {salesAssociateInfo.id}</h3>

                        <br />
                        <label htmlFor='name_associate'>Name:</label>
                        <input 
                            id='name_associate'
                            onChange={handleInputChange}
                            type='text'
                            value={salesAssociateInfo.name_associate}
                        />

                        <br />
                        <label htmlFor='username'>Username:</label>
                        <input
                            id='username'
                            type='text'
                            onChange={handleInputChange}
                            value={salesAssociateInfo.username}
                        />

                        <br />
                        <label htmlFor='address'>Address:</label>
                        <input 
                            id='address'
                            type='text'
                            onChange={handleInputChange}
                            value={salesAssociateInfo.address}
                        />


                        <br />
                        <label htmlFor='password'>New Password:</label>
                        <input 
                            id='password'
                            type='text'
                            onChange={handleInputChange}
                            value={salesAssociateInfo.password}
                        />

                        <br />
                        <label htmlFor='sale_commission'>Commission:</label>
                        <input 
                            id='sale_commission'
                            type='number'
                            onChange={handleInputChange}
                            value={salesAssociateInfo.sale_commission}
                        />

                        <br />
                        <br />
                        <button
                            className='mainLink'
                            onClick={updateAssociateInfo}
                        >
                            Update
                        </button>
                    </div>
                    // false block -> loading in a gif to show that the modal is loading the info in
                    : <img src={loadSpinner} alt={'loading...'} ></img>
                }

                <br />
                <hr />
                <br />
                <button 
                    className="subLinkBlack"
                    onClick={() => dialog.current.close()}
                >
                    Close
                </button>
            </dialog>
            <button 
                className="subLinkBlack"
                onClick={handleOpen}
            >
                Edit
            </button>
        </div>
    );
}


export default SalesAssociateModal;