// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const chatRoutes = require('./routes/chatRoutes');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(bodyParser.json());
app.use('/chat', chatRoutes);
app.use(logger);

// MongoDB connection
mongoose.connect('mongodb+srv://sriramtoram:password9594@cluster0.5zjkmzu.mongodb.net/')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.get('/', (req, res) => {
  res.send('Welcome to the Real-Time Chat App Backend!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));