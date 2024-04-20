import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import SignUp from './components/Signup';
import CustomerList from './components/CustomerList';
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

    const handleLogin = (username, password) => {
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            setCurrentUser(user);
            setLoggedIn(true);
        } else {
            alert('Invalid credentials');
        }
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
            <h1 className="welcome">Customer Management</h1>
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
