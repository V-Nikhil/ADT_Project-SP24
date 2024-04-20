import React, { useState, useEffect } from 'react';
import AddCustomerForm from './AddCustomerForm';
import '../css/styles.css'; // Import the CSS file

const CustomerList = ({ currentUser, onLogout }) => {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [searchEmail, setSearchEmail] = useState('');
    const [searchMobile, setSearchMobile] = useState('');
    const [showAddCustomerForm, setShowAddCustomerForm] = useState(false);

    useEffect(() => {
        // Retrieve user-specific customer list from local storage
        const storedCustomers = JSON.parse(localStorage.getItem(`customers_${currentUser.username}`)) || [];
        setCustomers(storedCustomers);
        setFilteredCustomers(storedCustomers);
    }, [currentUser]);

    const handleAddCustomer = (newCustomer) => {
        const updatedCustomers = [...customers, newCustomer];
        setCustomers(updatedCustomers);
        // Update user-specific customer list in local storage
        localStorage.setItem(`customers_${currentUser.username}`, JSON.stringify(updatedCustomers));
        // Hide the AddCustomerForm after submission
        setShowAddCustomerForm(false);
    };

    const handleDeleteCustomer = (customerId) => {
        const updatedCustomers = customers.filter(customer => customer.id !== customerId);
        setCustomers(updatedCustomers);
        setFilteredCustomers(updatedCustomers); // Update filtered list
        // Update user-specific customer list in local storage
        localStorage.setItem(`customers_${currentUser.username}`, JSON.stringify(updatedCustomers));
    };

    const handleSearch = () => {
        const searchResult = customers.filter(customer => {
            const matchesEmail = customer.email.toLowerCase().includes(searchEmail.toLowerCase());
            const matchesMobile = customer.contactNumber.includes(searchMobile);
            if (searchEmail || searchMobile) {
                return matchesEmail && matchesMobile;
            }
            return true; // Show all if no search criteria provided
        });
        setFilteredCustomers(searchResult);
    };

    const handleToggleShowAllCustomers = () => {
        if (filteredCustomers.length === customers.length) {
            setFilteredCustomers([]);
        } else {
            setFilteredCustomers(customers);
        }
    };

    return (
        <div className="container">
            <h2 className="welcome">Welcome, {currentUser.username}!</h2>
            {!showAddCustomerForm && (
                <>
                    <h2 className="card-title">Customer List</h2>
                    <div className="card">
                        <input
                            type="text"
                            placeholder="Search by email"
                            value={searchEmail}
                            onChange={(e) => setSearchEmail(e.target.value)}
                            className="form-input"
                        />
                        <input
                            type="text"
                            placeholder="Search by mobile number"
                            value={searchMobile}
                            onChange={(e) => setSearchMobile(e.target.value)}
                            className="form-input"
                        />
                        <br></br>
                        <button onClick={handleSearch} className="button">Search</button>
                    </div>
                    {filteredCustomers.length === 0 && <p>No customers found.</p>}
                    <button onClick={handleToggleShowAllCustomers} className="button">
                        {filteredCustomers.length === customers.length ? 'Hide all customers' : 'Show all customers'}
                    </button>
                    <button onClick={() => setShowAddCustomerForm(true)} className="button">Add Customer</button>
                </>
            )}
            {!showAddCustomerForm && (
                <ul>
                    {filteredCustomers.map(customer => (
                        <li key={customer.id} className="card">
                            {/* Customer details */}
                            <p className="card-content"><strong>Name:</strong> {customer.firstName} {customer.middleName} {customer.lastName}</p>
                            <p className="card-content"><strong>Email:</strong> {customer.email}</p>
                            {customer.contactNumber && <p className="card-content"><strong>Contact Number:</strong> {customer.contactNumber}</p>}
                            {customer.address && <p className="card-content"><strong>Address:</strong> {customer.address}</p>}
                            {customer.city && <p className="card-content"><strong>City:</strong> {customer.city}</p>}
                            {customer.state && <p className="card-content"><strong>State:</strong> {customer.state}</p>}
                            {customer.pincode && <p className="card-content"><strong>Pincode:</strong> {customer.pincode}</p>}
                            {customer.allergies.length > 0 && <p className="card-content"><strong>Allergies:</strong> {customer.allergies.join(', ')}</p>}
                            {customer.preferenceSpiceLevel && <p className="card-content"><strong>Preference Spice Level:</strong> {customer.preferenceSpiceLevel}</p>}
                            {customer.preferenceCookingLevel && <p className="card-content"><strong>Preference Cooking Level for Meat:</strong> {customer.preferenceCookingLevel}</p>}
                            {customer.preferenceCookingOil && <p className="card-content"><strong>Preference Cooking Oil:</strong> {customer.preferenceCookingOil}</p>}
                            {customer.preferenceNotes && <p className="card-content"><strong>Preference Notes:</strong> {customer.preferenceNotes}</p>}
                            <button onClick={() => handleDeleteCustomer(customer.id)} className="button">Delete</button>
                        </li>
                    ))}
                </ul>
            )}
            {showAddCustomerForm && <AddCustomerForm onAddCustomer={handleAddCustomer} onCancel={() => setShowAddCustomerForm(false)} />}
            <button onClick={onLogout} className="button">Logout</button>
        </div>
    );
};

export default CustomerList;
