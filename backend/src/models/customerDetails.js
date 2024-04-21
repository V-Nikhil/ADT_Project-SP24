const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailId: { type: String, required: true, unique: true },  // Ensuring uniqueness
    contactNumber: { type: String, required: true, unique: true },  // Ensuring uniqueness
    address1: { type: String, required: false },
    city: { type: String, required: false },
    stateAndPincode: { type: String, required: false },
    allergicIngredients: { type: String, required: false },
    avoidIngredientsForAllergy: { type: String, required: false },
    allergicNotes: { type: String, required: false },
    preferenceSpiceLevel: { type: String, required: false },
    preferenceCookingLevelForMeat: { type: String, required: false },
    preferenceCookingOil: { type: String, required: false },
    preferenceNotes: { type: String, required: false }
}, { timestamps: true });  // Optional: Adds createdAt and updatedAt timestamps

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
