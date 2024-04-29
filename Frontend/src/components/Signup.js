import React, { useState } from 'react';
import '../css/styles.css'; // Import the CSS file

const SignUp = ({ onSignUp }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_BACKEND_URL}/user/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: username,
            email: email,
            password: password,
          }),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          onSignUp(data); // Update your `onSignUp` to handle the user registration data.
        })
        .catch(error => {
          console.log(error);
        });
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
