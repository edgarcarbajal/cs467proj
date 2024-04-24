import { Link, useRouteError } from "react-router-dom";
import '../css_files/App.css';

// An router error page when something goes wrong with route searchup? From react-router-dom tutorial
const ErrorPage = () => {
    const error = useRouteError();
    console.log('ErrorPage.jsx: ', error);

    return (
        <div id='error-page'>
            <h1>Oops!</h1>
            <p>An unexpected error has occured!</p>
            <p>Please contact an administrator, or come back and try again later.</p>

            <br />
            <Link to={'/'} className="mainLink">
                Return to Home Page
            </Link>
            <br />

            <h3>Error Message:</h3>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
};

export default ErrorPage;