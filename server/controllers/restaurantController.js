const {
  likedRestaurants,
  selectedRestaurants,
} = require('../models/restaurantModel');
require('dotenv').config();

const restaurantController = {};

const apiKey = process.env.YELP_API_KEY;
const baseUrl = 'https://api.yelp.com/v3/businesses/search';
// make request to api
restaurantController.api = (req, res, next) => {
  const query = Object.keys(req.body)
    .map(key => {
      if (key === 'categories') {
        return req.body[key];
      }
      return `${key}=${req.body[key]}`;
    })
    .join('&');
  // constructing URL
  const url = `${baseUrl}?${query}`;
  // console.log(url);
  fetch(url, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  })
    .then(response => {
      return response.json();
    })
    .then(data => {
      res.locals.apiRestaurants = data.businesses;
      // console.log(res.locals.apiRestaurants);
      next();
    })
    .catch(err =>
      next({
        error: err,
      })
    );
};

// handle post request when restaurant is liked
restaurantController.save = async (req, res, next) => {
  try {
    // only try to add if it doesn't already exist
    const { name, rating, location, image_url } = req.body;
    const liked = await likedRestaurants.findOne({ name });
    if (!liked) {
      await likedRestaurants.create({
        name,
        rating,
        location,
        image_url,
      });
      console.log('liked');
      res.status(201).json({ message: 'Liked!' });
    } else {
      console.log('already liked');
      res.status(409).json({ message: 'Already liked' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

// handle get request
restaurantController.get = async (req, res, next) => {
  try {
    const all = await likedRestaurants.find({});
    if (all) {
      res.locals.restaurants = all;
      await likedRestaurants.deleteMany({});
      next();
    } else {
      res.status(409).json({ message: 'No liked restaurants' });
    }
  } catch (err) {
    console.log(err);
    next({ error: err });
  }
};

// handle restart
restaurantController.restart = (req, res, next) => {
  console.log('restart');
  likedRestaurants
    .deleteMany({})
    .then(() => {
      res.status(200).json({ message: 'Database cleared successfully' });
    })
    .catch(err => {
      console.error('Error clearing database:', err);
      res.status(500).json({ error: err });
    });
};

module.exports = restaurantController;
