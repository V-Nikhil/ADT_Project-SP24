// Import necessary modules
const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = 'mongodb+srv://vmunnang:root0301@resturantend.fvcfjva.mongodb.net/?retryWrites=true&w=majority&appName=ResturantEnd';
const dbName = 'ResturantEnd';

// Function to search for customer by contact number
async function searchCustomerByContactNumber(contactNumber) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('Customer'); // Change 'your_collection_name' to your collection name

        // Format contact number to match database format
        const formattedContactNumber = contactNumber.replace(/-/g, '');

        const result = await collection.findOne({ 'Contact Number': formattedContactNumber }); // Adjust field name if needed
        return result;
    } finally {
        await client.close();
    }
}

module.exports = { searchCustomerByContactNumber };
