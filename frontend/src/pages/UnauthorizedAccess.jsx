import { Link, useLocation } from "react-router-dom";

const UnauthorizedAccess = () => {
    const location = useLocation(); // stores info about current link of react router and its state etc...
    const tempStyle = {
        'background-color': '#d06464',
    };

    return (
        <div style={tempStyle}>
            <h1>Unauthorized Access!</h1>
            <p>You are not able to access this page or its resources!</p>

            <h3>Reasoning:</h3>
            <pre>
                {location.state.authError.message}
            </pre>

            <Link to={{
                pathname: '/',
                state: {}
            }}>
                Return to Home Page
            </Link>
        </div>
    );
}


export default UnauthorizedAccess;