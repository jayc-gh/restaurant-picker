const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const restaurantController = require('./controllers/restaurantController');
const app = express();
const PORT = 8080;

app.use(express.json());

// route for get request getting list of restaurants
app.get('/restaurants', restaurantController.get, (req, res) => {
  res.status(200).json(res.locals.restaurants);
});

// route for post request storing liked restaurants
app.post('/restaurants', restaurantController.save, (req, res) => {
  res.status(200).send('Restaurant liked!');
});

// route for delete request unliking restaurants
app.delete('/restaurants', restaurantController.deleteLiked, (req, res) => {
  res.status(200).send('Restaurant unliked');
});

// route for put request deleting liked collection
app.put('/restaurants', restaurantController.restart, (req, res) => {
  res.status(200).send('Reset complete');
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
