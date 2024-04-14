import { createBrowserRouter } from "react-router-dom";
import App from "./pages/App";
import ErrorPage from "./pages/ErrorPage";
import StaffInterface from "./pages/StaffInterface";
import QuoteTrackingProgram from "./pages/salesassociate";
import LoginTest from "./pages/LoginTest";

const pagerouter = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
    },
    //can add more routes below by adding js objects '{}' with 'path', and 'element' attributes like above for root page. 'path' string prepends
    // the string from the routes above it!
    // if want to render components inside a specified page, can use 'children' attribute to render pages/components together given a route 
    // it takes an array js objects just like createBrowserRouter! (ie: recursive)
    {
        path: 'hqstaff',
        element: <StaffInterface />
    },
    {
        path: 'salesassociate',
        element: <QuoteTrackingProgram />
    },
    {
        path: 'login',
        element: <LoginTest />
    }
]);

export default pagerouter;