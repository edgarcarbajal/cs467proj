import { NavLink, useNavigate } from "react-router-dom";
import '../css_files/NavBar.css';
import '../css_files/App.css';

const NavBar = () => {
    const pageNavigator = useNavigate();
    const handleLogOut = () => {
        sessionStorage.removeItem('UserAuth');
        sessionStorage.removeItem('username');
        pageNavigator('/');
    }

    return(
        <nav 
            id="navbar"
        >
            <ul>
                <li>
                    <NavLink // the link it goes on depends on url!
                        className={({isActive}) => isActive ? 'activeLink' : 'inactiveLink'}
                        to={'salesassociate'}
                    >
                        Sales Associate Interface
                    </NavLink>
                </li>
                
                <li>
                    <NavLink
                        className={({isActive}) => isActive ? 'activeLink' : 'inactiveLink'}
                        to={'adminstaff'}
                    >
                        Admin Interface
                    </NavLink>
                </li>


                <li>
                    <NavLink
                        className={({isActive}) => isActive ? 'activeLink' : 'inactiveLink'}
                        to={'hqstaff'}
                    >
                        HQ Staff Interface
                    </NavLink>
                </li>

                <li>
                    <NavLink 
                        className={({isActive}) => isActive ? 'activeLink' : 'inactiveLink'}
                        to={'PurchaseOrder'}
                    >
                        Convert to Purchase Order Interface
                    </NavLink>
                </li>

                <li>
                    <button 
                        className="subLinkRed"
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