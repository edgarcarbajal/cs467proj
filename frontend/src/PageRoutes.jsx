import { createBrowserRouter } from "react-router-dom";
import App from "./pages/App";
import ErrorPage from "./pages/ErrorPage";
import StaffInterface from "./pages/StaffInterface";
import QuoteTrackingProgram from "./pages/salesassociate";
import PurchaseOrder from "./pages/PurchaseOrder";
import LoginPage from "./pages/LoginPage";
import AlreadyLoggedIn from "./pages/AlreadyLoggedIn";
import Dashboard from "./pages/Dashboard";
import UnauthorizedAccess from "./pages/UnauthorizedAccess";
import AdminInterface from "./pages/adminIntereface";

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
        path: 'dashboard',
        element: <Dashboard />,
        errorElement: <ErrorPage />,
        children: [
           {
            path: 'adminstaff',
                element: <AdminInterface />,
           },
            {
                path: 'hqstaff',
                element: <StaffInterface />,
            },
            {
                path: 'PurchaseOrder',
                element: <PurchaseOrder />,
            },
            {
                path: 'salesassociate',
                element: <QuoteTrackingProgram />,
            },
        ]
    },
    {
        path: 'login',
        element: <LoginPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: 'alreadyLoggedInUser',
        element: <AlreadyLoggedIn />,
        errorElement: <ErrorPage />
    },
    {
        path: 'unauthorized',
        element: <UnauthorizedAccess />,
        errorElement: <ErrorPage />
    }
    
]);

export default pagerouter;