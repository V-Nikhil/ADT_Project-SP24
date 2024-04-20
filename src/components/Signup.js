import React, { useState } from 'react';
import '../css/styles.css'; // Import the CSS file

const SignUp = ({ onSignUp }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            username,
            password,
            customers: [] // Initialize with an empty array for customers
        };
        onSignUp(newUser);
    };

    return (
        <div className="container">
            <h2 className="signup-heading">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="signup-input" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="signup-input" />
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="signup-input" />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="signup-input" />
                <button type="submit" className="signup-button">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;
