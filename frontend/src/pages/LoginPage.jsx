import { useEffect, useState } from "react";
import { postAPI } from "../APICallingUtilities";
import { useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import '../css_files/LoginPage.css';
import '../css_files/App.css';

const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginType, setLoginType] = useState('');

    const pageNavigator = useNavigate();

    useEffect(() => {
        if(sessionStorage.getItem('UserAuth')) {
            pageNavigator('/alreadyLoggedInUser')
        }
    }, [pageNavigator]);


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleLogin = () => {
        let url;
        if (loginType === '')
            return window.alert('Please choose a login type first before logging in!');
        else if (loginType === 'sales') 
            url = 'http://localhost:8050/auth/salesassociate/login';
        else if (loginType === 'headquarters')
            url = 'http://localhost:8050/auth/headquarters/login';
        else
            url = 'http://localhost:8050/auth/administrator/login';

        try {
            postAPI(url, {username, password})
                .then((data) => {
                    if(data.error) {
                        console.log(data.error)
                        window.alert(`An unexpected error has occured!\nError: ${data.error}`)
                    }
                    else {
                        const tokenData = data.split('.');
                        const payload = JSON.parse(atob(tokenData[1])); // decode token payload
                        
                        sessionStorage.setItem('UserAuth', data);
                        sessionStorage.setItem('username', username);
                        sessionStorage.setItem('user_id', payload.id); //save user id (for when users make changes to db)
                        console.log('id:', sessionStorage.getItem('user_id'))
                        pageNavigator('/dashboard');
                    }
                })
        }
        catch (error) {
            console.log('LoginTest.jsx - Error:', error);
        }
    }

    const handleLoginChange = (event) => {
        setLoginType(event.target.value);
    }

    return (
        <div>
            <AppHeader />

            <h1 className="text-5xl flex justify-center p-12">
                Login
            </h1>
            <div className="loginCard">
                <h2>Username:</h2>
                <input 
                    className="text-black shadow"
                    onChange={handleUsernameChange}
                    type="text"
                    value={username}
                />
                <br />

                <h2>Password:</h2>
                <input 
                    className="text-black shadow"
                    onChange={handlePasswordChange}
                    type="password"
                    value={password}
                />
                <br />
                <br />

                <fieldset 
                    className="radioCard"
                    onChange={handleLoginChange}
                >
                    <legend>Select the type of Login</legend>
                    <input 
                        id="sales"
                        name="loginType"
                        type="radio"
                        value={'sales'}
                    />
                    <label htmlFor="sales">Sales Associate</label>
                    <br />

                    <input 
                        id="hq"
                        name="loginType"
                        type="radio"
                        value={'headquarters'}
                    />
                    <label htmlFor="hq">Headquarters</label>
                    <br />

                    <input 
                        id="admin"
                        name="loginType"
                        type="radio"
                        value={'admin'}
                    />
                    <label htmlFor="admin">Administration</label>
                    <br />
                </fieldset>

                <br />
                <button
                    className="mainLink"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </div>

            <br />
            <br />
        </div>
    );
}

export default LoginPage;