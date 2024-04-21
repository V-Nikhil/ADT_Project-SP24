// Import necessary modules
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const customerRoutes = require('./routes/customerRoutes');
var cors = require('cors')



const app = express();

const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;


// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


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

app.get('/', (req, res) => {
  res.send('Welcome Nikhil to the  Backend!');
});

app.use("/user", userRoutes);
app.use("/customer", customerRoutes); 


// app.use(notFound);
// app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));