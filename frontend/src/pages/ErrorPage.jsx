import { useRouteError } from "react-router-dom";

// An router error page when something goes wrong with route searchup? From react-router-dom tutorial
const ErrorPage = () => {
    const error = useRouteError();
    console.log('ErrorPage.jsx: ', error);

    return (
        <div id='error-page'>
            <h1>Oops!</h1>
            <p>An unexpected error has occured!</p>

            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
};

export default ErrorPage;