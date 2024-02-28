// Import necessary modules
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const chatRoutes = require('./routes/chatRoutes');
const logger = require('./middleware/logger');

const app = express();

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

// Middleware
app.use(bodyParser.json());
// app.use('/chat', chatRoutes);
// app.use(logger);

// MongoDB connection
mongoose.connect(DB_URI)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.get('/', (req, res) => {
  res.send('Welcome to the Real-Time Chat App Backend!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));