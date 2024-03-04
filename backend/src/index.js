// Import necessary modules
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const chatRoutes = require('./routes/chatRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");


const app = express();

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({origin: "*"}));


// app.use(logger);

// MongoDB connection

const db_Connection = async () =>{
  try{
    const dbconn = await mongoose.connect(DB_URI);
    console.log('Connected to MongoDB...')
  }catch(err){
    console.error('Could not connect to MongoDB...', err);
  }
};
db_Connection();
// mongoose.connect(DB_URI)
//   .then(() => console.log('Connected to MongoDB...'))
//   .catch(err => console.error('Could not connect to MongoDB...', err));

app.get('/', (req, res) => {
  res.send('Welcome sriram to the Real-Time Chat App Backend!');
});

app.use('/user',userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));