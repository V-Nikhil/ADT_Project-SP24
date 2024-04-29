const Customer = require('../models/customerDetails'); // Ensure correct path to the Customer model

// Create a new customer
exports.createCustomer = async (req, res) => {
    try {
        const newCustomer = new Customer(req.body);
        await newCustomer.save();
        res.status(201).send(newCustomer);
    } catch (error) {
        if (error.code === 11000) {
            res.status(409).send('Error: Duplicate email or contact number provided.');
        } else {
            res.status(400).send(error);
        }
    }
};

// Get a customer by contact number
exports.getCustomerByContactNumber = async (req, res) => {
    try {
        const customer = await Customer.findOne({ contactNumber: req.body.contactNumber });
        if (!customer) {
            return res.status(404).send('Customer not found');
        }
        res.status(200).send(customer);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a customer
exports.updateCustomer = async (req, res) => {
    const { contactNumber } = req.params;
    const newCustomerData = req.body;

    try {
        // Find the existing customer document by contact number
        const existingCustomer = await Customer.findOne({ contactNumber });

        if (!existingCustomer) {
            return res.status(404).send('No customer found with that contact number.');
        }

        // Update the existing customer document with new data
        existingCustomer.set(newCustomerData);
        const updatedCustomer = await existingCustomer.save();

        // Optionally, you can delete the old record if needed
        // await Customer.findByIdAndDelete(existingCustomer._id);

        res.send(updatedCustomer);
    } catch (error) {
        res.status(400).send(error);
    }
};

  

