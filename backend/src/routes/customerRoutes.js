const express = require('express');
const customerController = require('../controllers/customerController');  // Adjust the path as necessary
const Router = express.Router();

Router.post('/customers', customerController.createCustomer);
Router.get('/customersnum', customerController.getCustomerByContactNumber);
Router.put('/customers/:contactNumber', customerController.updateCustomer);

module.exports = Router;