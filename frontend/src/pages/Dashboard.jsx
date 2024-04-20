import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import AppHeader from "../components/AppHeader";

const Dashboard = () => {
    return (
        <div>
            <AppHeader />
            <h1>Greenhouse Plant Repair Services - Dashboard</h1>
            <h2>Welcome, {sessionStorage.getItem('username') || '{USERNAME IS NOT SET}'}!</h2>
            <NavBar />
            <div id="detail">
                <Outlet />
            </div>
        </div>
    );
}

export default Dashboard;