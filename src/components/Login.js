// Login.js
import React, { useState } from 'react';
import '../css/styles.css'; // Import the CSS file

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <div className="container">
            <h2 className="login-heading">Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="login-input" /> {/* Add a login-input class in styles.css */}
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" /> {/* Add a login-input class in styles.css */}
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default Login;
