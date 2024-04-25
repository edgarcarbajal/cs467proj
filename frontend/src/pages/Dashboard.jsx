import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import AppHeader from "../components/AppHeader";

const Dashboard = () => {
    let userTypeStr = '{unknown}:';
    if (sessionStorage.getItem('userType') === 'sales') 
        userTypeStr = 'Sales Associate:';
    else if (sessionStorage.getItem('userType') === 'hq')
        userTypeStr = 'HQ user:';
    else if (sessionStorage.getItem('userType') === 'admin')
        userTypeStr = 'Admin user:';

    let userOrName = '{USERNAME IS NOT SET}';
    if (sessionStorage.getItem('name_associate') != 'undefined')
        userOrName = `${sessionStorage.getItem('name_associate')} (${sessionStorage.getItem('username')})`;
    else
        userOrName = sessionStorage.getItem('username');
    
    return (
        <div>
            <AppHeader />
            <h1>Greenhouse Plant Repair Services - Dashboard</h1>
            <h2>Welcome, {userTypeStr} {userOrName}!</h2>
            <NavBar />
            <div id="detail">
                <Outlet />
            </div>
        </div>
    );
}

export default Dashboard;