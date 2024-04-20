import React, { useState } from 'react';
import '../css/styles.css'; // Import CSS file for styling

const AddCustomerForm = ({ onAddCustomer }) => {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const [allergies, setAllergies] = useState([]);
    const [preferenceSpiceLevel, setPreferenceSpiceLevel] = useState('');
    const [preferenceCookingLevel, setPreferenceCookingLevel] = useState('');
    const [preferenceCookingOil, setPreferenceCookingOil] = useState('');
    const [otherOil, setOtherOil] = useState('');
    const [preferenceNotes, setPreferenceNotes] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newCustomer = {
            id: Date.now(),
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
        onAddCustomer(newCustomer);
        // Clear form fields after submission
        setFirstName('');
        setMiddleName('');
        setLastName('');
        setEmail('');
        setContactNumber('');
        setAddress('');
        setCity('');
        setState('');
        setPincode('');
        setAllergies([]);
        setPreferenceSpiceLevel('');
        setPreferenceCookingLevel('');
        setPreferenceCookingOil('');
        setOtherOil('');
        setPreferenceNotes('');
    };

    return (
        <div className="container">
            <h2 className="signup-heading">Add Customer</h2>
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
                    <button type="submit" className="button">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddCustomerForm;
