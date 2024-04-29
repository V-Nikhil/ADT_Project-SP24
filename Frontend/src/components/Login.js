import React, { useState } from 'react';
import '../css/styles.css'; // Import the CSS file

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState(''); // Changed from username to email
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }) // Sending email instead of username
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.token) {
                localStorage.setItem('userToken', data.token);
                onLoginSuccess(data); // Function to handle login success
            } else {
                throw new Error('Token not provided');
            }
        })
        .then(data => {
            console.log(data);  // See what the actual structure is
            if (data.token) {
                localStorage.setItem('userToken', data.token);
                onLoginSuccess(data);
            } else {
                throw new Error('Token not provided');
            }
        })
        
        .catch(error => {
            console.error('Login Error:', error);
        });
    };

    return (
        <div className="container">
            <h2 className="login-heading">Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="login-input" /> {/* Changed input type to email */}
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="login-input" />
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default Login; // This should be the last line inside the file that is related to the component export
