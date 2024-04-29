import React, { useState, useEffect } from 'react';
import '../css/styles.css'; // Import CSS file for styling

const AddCustomerForm = ({ customer, onAddCustomer, onCancel }) => {
    const [firstName, setFirstName] = useState(customer ? customer.firstName : '');
    const [middleName, setMiddleName] = useState(customer ? customer.middleName : '');
    const [lastName, setLastName] = useState(customer ? customer.lastName : '');
    const [email, setEmail] = useState(customer ? customer.email : '');
    const [contactNumber, setContactNumber] = useState(customer ? customer.contactNumber : '');
    const [address, setAddress] = useState(customer ? customer.address : '');
    const [city, setCity] = useState(customer ? customer.city : '');
    const [state, setState] = useState(customer ? customer.state : '');
    const [pincode, setPincode] = useState(customer ? customer.pincode : '');
    const [allergies, setAllergies] = useState(customer ? customer.allergies : []);
    const [preferenceSpiceLevel, setPreferenceSpiceLevel] = useState(customer ? customer.preferenceSpiceLevel : '');
    const [preferenceCookingLevel, setPreferenceCookingLevel] = useState(customer ? customer.preferenceCookingLevel : '');
    const [preferenceCookingOil, setPreferenceCookingOil] = useState(customer ? customer.preferenceCookingOil : '');
    const [otherOil, setOtherOil] = useState(customer && customer.preferenceCookingOil === 'Other' ? (customer.otherOil || '') : '');
    const [preferenceNotes, setPreferenceNotes] = useState(customer ? customer.preferenceNotes : '');

    useEffect(() => {
        if (customer && customer.preferenceCookingOil === 'Other') {
            setOtherOil(customer.otherOil || '');
        }
    }, [customer]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedCustomer = {
            ...customer,
            firstName,
            middleName,
            lastName,
            email,
            contactNumber,
            address,
            city,
            state,
            pincode,
            allergies,
            preferenceSpiceLevel,
            preferenceCookingLevel,
            preferenceCookingOil: preferenceCookingOil === 'Other' ? otherOil : preferenceCookingOil,
            preferenceNotes
        };
        onAddCustomer(updatedCustomer);
    };

    return (
        <div className="container">
            <h2>{customer ? 'Edit Customer' : 'Add Customer'}</h2>
            <form onSubmit={handleSubmit} className="card">
                <div className="card-content">
                    <h3>Personal Information</h3>
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="signup-input"
                    />
                    <label>Middle Name:</label>
                    <input
                        type="text"
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                        className="signup-input"
                    />
                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="signup-input"
                    />
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="signup-input"
                    />
                    <label>Contact Number:</label>
                    <input
                        type="text"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        className="signup-input"
                    />
                    <label>Address:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="signup-input"
                    />
                    <label>City:</label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="signup-input"
                    />
                    <label>State:</label>
                    <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="signup-input"
                    />
                    <label>Pincode:</label>
                    <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="signup-input"
                    />
                </div>
                <div className="card-content">
                    <h3>Allergies and Preferences</h3>
                    <div className="input-container">
                        <label>Allergies:</label>
                        <input
                            type="text"
                            value={allergies.join(', ')}
                            onChange={(e) => setAllergies(e.target.value.split(',').map(item => item.trim()))}
                            placeholder="Enter allergies separated by comma"
                            className="signup-input"
                        />
                    </div>
                    <div>
                        <label>Preference Spice Level:</label>
                        <select value={preferenceSpiceLevel} onChange={(e) => setPreferenceSpiceLevel(e.target.value)} className="signup-input">
                            <option value="">Select</option>
                            <option value="Less Spicy">Less Spicy</option>
                            <option value="Medium Spicy">Medium Spicy</option>
                            <option value="Very Spicy">Very Spicy</option>
                            <option value="No preference">No preference</option>
                        </select>
                    </div>
                    <div>
                        <label>Preference Cooking Level for Meat:</label>
                        <select value={preferenceCookingLevel} onChange={(e) => setPreferenceCookingLevel(e.target.value)} className="signup-input">
                            <option value="">Select</option>
                            <option value="Rare">Rare</option>
                            <option value="Medium">Medium</option>
                            <option value="Well Done">Well Done</option>
                            <option value="No preference">No preference</option>
                        </select>
                    </div>
                    <div>
                        <label>Preference Cooking Oil:</label>
                        <select value={preferenceCookingOil} onChange={(e) => setPreferenceCookingOil(e.target.value)} className="signup-input">
                            <option value="">Select</option>
                            <option value="Olive Oil">Olive Oil</option>
                            <option value="Vegetable Oil">Vegetable Oil</option>
                            <option value="Coconut Oil">Coconut Oil</option>
                            <option value="Other">Other</option>
                        </select>
                        {preferenceCookingOil === 'Other' && (
                            <input
                                type="text"
                                value={otherOil}
                                onChange={(e) => setOtherOil(e.target.value)}
                                placeholder="Other Cooking Oil"
                                className="signup-input"
                            />
                        )}
                    </div>
                    <div>
                        <label>Preference Notes:</label>
                        <textarea
                            value={preferenceNotes}
                            onChange={(e) => setPreferenceNotes(e.target.value)}
                            rows="4"
                            className="signup-input"
                        ></textarea>
                    </div>
                    <button type="submit" className="button">{customer ? 'Save' : 'Submit'}</button>
                    {onCancel && <button onClick={onCancel} className="button">Cancel</button>}
                </div>
            </form>
        </div>
    );
};

export default AddCustomerForm;
