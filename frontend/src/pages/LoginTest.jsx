import { useEffect, useState } from "react";
import { getAPI, postAPI } from "../APICallingUtilities";
import { useNavigate } from "react-router-dom";

const LoginTest = () => {

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
                    //console.log('response data from login:', data);
                    sessionStorage.setItem('UserAuth', data);
                    sessionStorage.setItem('username', username);
                    pageNavigator('/dashboard');
                })
        }
        catch (error) {
            console.log('LoginTest.jsx - Error:', error);
        }
    }

    const handleLoginChange = (event) => {
        setLoginType(event.target.value);
    }
    
    const handleAuthTest = () => {
        try {
            getAPI('http://localhost:8050/auth/', sessionStorage.getItem('UserAuth'))
                .then((data) => {
                    console.log('response data from auth:', data);
                })
        }
        catch(error) {
            console.log('LoginTest.jsx - Error:', error);
        }
    }

    return (
        <div>
            <h2>Username:</h2>
            <input 
                onChange={handleUsernameChange}
                type="text"
                value={username}
            />
            <br />

            <h2>Password:</h2>
            <input 
                onChange={handlePasswordChange}
                type="password"
                value={password}
            />
            <br />
            <br />

            <fieldset onChange={handleLoginChange}>
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
                onClick={handleLogin}
            >
                Login
            </button>
            <hr />
            <button
                onClick={handleAuthTest}
            >
                Click here to test Token Authorization!
            </button>
        </div>
    );
}

export default LoginTest;