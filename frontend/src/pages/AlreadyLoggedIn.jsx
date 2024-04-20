import { Link } from "react-router-dom";

const AlreadyLoggedIn = () => {
    return (
        <div>
            <h1>You have already logged in!</h1>
            <p>According to our data, you are already logged in!</p>
            <p>Please return back to the dashboard. If you wish to log out, click the "Log Out" button at the top of the navbar when you return to dashboard.</p>

            <br />
            <Link 
                className="mainLink"
                to={'/dashboard'}
            >
                Return to Dashboard
            </Link>
        </div>
    );
}

export default AlreadyLoggedIn;