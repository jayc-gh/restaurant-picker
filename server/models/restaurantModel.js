const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likedRestaurantsSchema = new Schema({
  name: String,
  rating: String,
  location: Object,
  image_url: String,
  distance: Number,
  price: String,
});

const selectedRestaurantsSchema = new Schema({
  name: String,
  rating: String,
  location: Object,
  image_url: String,
  distance: Number,
  price: String,
});

module.exports = {
  likedRestaurants: mongoose.model('likedRestaurants', likedRestaurantsSchema),
  selectedRestaurants: mongoose.model(
    'selectedRestaurants',
    selectedRestaurantsSchema
  ),
};
