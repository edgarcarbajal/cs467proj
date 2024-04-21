import { Link } from "react-router-dom";
import greenhouseLogo from '../greenhouseLogo.svg'
import '../css_files/App.css';

const AppHeader = () => {
    return (
        <header className="homepageNav">
            <Link to={'/'}>
                <img src={greenhouseLogo} alt="Greenhouse Services Logo"/>
            </Link>

            <button className="subLink">
                Services
            </button>

            <button className="subLink">
                Contact
            </button>

            <button className="subLink">
                About
            </button>

            <Link to={'./adminTest'}>
                <button className="subLink">adminTest</button>
            </Link>

            <Link to={'/login'}>
                <button className="mainLink">Go to Login Page</button>
            </Link>
        </header>
    );
}

export default AppHeader;