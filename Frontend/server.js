const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const port = 3004;



// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Route to serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Route to handle form submission
app.post('/submit', (req, res) => {
    const formData = req.body;
    // Process the form data (e.g., save to database)
    console.log(formData);
    // Respond to the client
    res.send('Form submitted successfully!');
});




// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

