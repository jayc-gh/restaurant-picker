const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const restaurantController = require('./controllers/restaurantController');
const app = express();
const PORT = 3000;
const cors = require('cors');
require('dotenv').config();

const URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${encodeURIComponent(
  process.env.MONGODB_PASSWORD
)}@${process.env.MONGODB_CLUSTER_URL}restaurants`;

mongoose.connect(URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('connected', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());
app.use(cors());

// post request to api
app.post('/api', restaurantController.api, (req, res) => {
  res.status(200).json(res.locals.apiRestaurants);
});

// // route for post request storing liked restaurants
app.post('/restaurants', restaurantController.like);

// // route for get request getting list of restaurants
app.get('/restaurants', restaurantController.get, (req, res) => {
  res.status(200).json(res.locals.restaurants);
});

app.get('/restart', restaurantController.restart);

app.post('/save', restaurantController.save);

app.get('/getSaved', restaurantController.getSaved, (req, res) => {
  res.status(200).json(res.locals.saved);
});

// catch all error
app.use('*', (req, res) => {
  res.sendStatus(404);
});

// gloabl error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
