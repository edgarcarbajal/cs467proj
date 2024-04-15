import { NavLink, useNavigate } from "react-router-dom";
import '../css_files/NavBar.css';

const NavBar = () => {
    const pageNavigator = useNavigate();
    const handleLogOut = () => {
        sessionStorage.removeItem('UserAuth');
        sessionStorage.removeItem('username');
        pageNavigator('/');
    }

    return(
        <nav id="navbar">
            <ul>
                <li>
                    <NavLink to={'salesassociate'}>  {/*<-- the link it actually goes to depends on the current link in URL */}
                        Sales Associate Interface
                    </NavLink>
                </li>
                
                <li>
                    <NavLink to={'hqstaff'}>
                        HQ Staff Interface
                    </NavLink>
                </li>

                <li>
                    <NavLink to={'PurchaseOrder'}>
                        Convert to Purchase Order Interface
                    </NavLink>
                </li>

                <li>
                    <button 
                        style={{float: "right"}}
                        onClick={handleLogOut}
                    >
                        Log Out
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;