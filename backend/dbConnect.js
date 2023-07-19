const mongoose = require('mongoose')
require('dotenv').config();

const connectionString = process.env.MONGODB_URI;

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });
  
  mongoose.connection.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  
  mongoose.connect(connectionString, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
      console.log('Connection successful');
    })
    .catch((error) => {
      console.error('Connection failed:', error);
    });
  
  module.exports = mongoose;

module.exports = mongoose