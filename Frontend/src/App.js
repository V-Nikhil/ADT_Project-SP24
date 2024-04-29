import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import SignUp from './components/Signup';
import CustomerList from './components/CustomerList';
import Logo from './components/Logo'; // Import the Logo component
import './css/styles.css'; // Import CSS file for styling

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [isSignUp, setIsSignUp] = useState(false);
    const [showUserList, setShowUserList] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    }, []);

    const handleLogin = (email, password) => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.token && data.user) {
                localStorage.setItem('userToken', data.token);  // Storing token for session management
                setCurrentUser(data.user);  // Assuming `data.user` contains the user details
                setLoggedIn(true);
            } else {
                throw new Error('Invalid credentials or missing data');
            }
        })
        .catch(error => {
            console.error('Login Error:', error);
            alert('Login failed: ' + error.message);
        });
    };
    


    const handleSignUp = (newUser) => {
        setUsers([...users, newUser]);
        setIsSignUp(false);
        alert('Signup successful!'); // Show alert for successful signup
    };

    const handleToggleSignUp = () => {
        setIsSignUp(!isSignUp);
    };

    const handleLogout = () => {
        setLoggedIn(false);
        setCurrentUser(null);
    };

    const handleToggleUserList = () => {
        setShowUserList(!showUserList);
    };

    const handleDeleteUser = (username) => {
        const updatedUsers = users.filter(user => user.username !== username);
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };

    return (
        <div className="container">
            <Logo />
            <h1 className="welcome">DineInSync</h1>
            {!loggedIn ? (
                <div className="card">
                    {!isSignUp ? (
                        <Login onLogin={handleLogin} />
                    ) : (
                        <SignUp onSignUp={handleSignUp} />
                    )}
                    {!isSignUp && (
                        <button onClick={handleToggleSignUp} className="button">
                            Sign Up
                        </button>
                    )}
                    <button onClick={handleToggleUserList} className="button">
                        {showUserList ? 'Hide User List' : 'Show User List'}
                    </button>
                    {showUserList && (
                        <div>
                            <h2>Users List</h2>
                            <ul>
                                {users.map(user => (
                                    <li key={user.username}>
                                        Username: {user.username}
                                        <button onClick={() => handleDeleteUser(user.username)} className="button">Delete</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <CustomerList key={currentUser.username} currentUser={currentUser} onLogout={handleLogout} />
            )}
        </div>
    );
}

export default App;
