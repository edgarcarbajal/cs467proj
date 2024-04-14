import { useState } from "react";
import { getAPI, postAPI } from "../APICallingUtilities";

const LoginTest = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleLogin = () => {
        try {
            postAPI('http://localhost:8050/auth/login', {username, password})
                .then((data) => {
                    console.log('response data from login:', data);
                    setToken(data)
                })
        }
        catch (error) {
            console.log('LoginTest.jsx - Error:', error);
        }
    }
    
    const handleAuthTest = () => {
        try {
            getAPI('http://localhost:8050/auth/', token)
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