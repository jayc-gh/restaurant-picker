const Restaurant = require('../models/restaurantModel');

const restaurantController = {};

// handle get request
restaurantController.get((req, res, next) => {});
// if restaurants_liked is empty, request from api
// else request from restaurants_liked
// if user tries to get from liked when it's empty, throw error msg

// handle post request when restaurant is liked
restaurantController.save((req, res, next) => {});
// some conditional to only save if it hasn't been liked before so
// only try to add if it doesn't already exist

// handle delete request from liked restaurants
restaurantController.deleteLiked((req, res, next) => {});

// handle restart
restaurantController.restart((req, res, next) => {});
// it will clear out restaurants_liked collection and save winning restaurant

module.exports = restaurantController;
