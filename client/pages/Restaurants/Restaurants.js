import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import { useNavigate } from 'react-router-dom';

const Restaurants = ({ params }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const test = {
    id: 'zc_VLXK9FnBb23jaDC8dZg',
    alias: 'saigon-usa-pho-and-grill-katy',
    name: 'Saigon USA Pho & Grill',
    image_url:
      'https://s3-media4.fl.yelpcdn.com/bphoto/KMSwDFcu_6Yss3msdfb8-A/o.jpg',
    is_closed: false,
    url: 'https://www.yelp.com/biz/saigon-usa-pho-and-grill-katy?adjust_creative=X5oJ0VwEHdU0jd1TbvyIhA&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=X5oJ0VwEHdU0jd1TbvyIhA',
    review_count: 55,
    categories: [
      {
        alias: 'vietnamese',
        title: 'Vietnamese',
      },
      {
        alias: 'chinese',
        title: 'Chinese',
      },
      {
        alias: 'seafood',
        title: 'Seafood',
      },
    ],
    rating: 4,
    price: '$$',
    coordinates: {
      latitude: 29.71831,
      longitude: -95.84541,
    },
    transactions: ['delivery', 'pickup'],
    location: {
      address1: '28818 Cinco Ranch Blvd',
      address2: 'Ste 100',
      address3: '',
      city: 'Katy',
      zip_code: '77494',
      country: 'US',
      state: 'TX',
      display_address: ['28818 Cinco Ranch Blvd', 'Ste 100', 'Katy, TX 77494'],
    },
    phone: '+18324375273',
    display_phone: '(832) 437-5273',
    distance: 2400.838603687272,
    attributes: {
      business_temp_closed: null,
      menu_url: null,
      open24_hours: null,
      waitlist_reservation: null,
    },
  };

  useEffect(() => {
    // setRestaurants([test]);
    fetch('http://localhost:3000/api', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) throw res;
        return res.json();
      })
      .then(data => {
        setRestaurants(data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, [params]);

  const handleInteraction = () => {};

  const unlikeRestaurant = () => {
    const newRestaurants = [...restaurants];
    newRestaurants.splice(index, 1);
    setRestaurants(newRestaurants);
  };

  const likeRestaurant = () => {
    // post request to store liked restaurant
    fetch('http://localhost:3000/restaurants', {
      method: 'POST',
      body: JSON.stringify(restaurants[index]),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(setIndex(index + 1))
      .catch(err => console.log(err));
  };

  const loadLikedRestaurants = () => {
    // get request to load liked restaurants
    fetch('http://localhost:3000/restaurants', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log('received!', data);
        setRestaurants(data);
        setIndex(0);
      })
      .catch(err => console.log(err));
  };

  const restart = async () => {
    fetch('http://localhost:3000/restart', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(err => console.log(err));
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center mt-16">
      <div className="flex justify-center w-1/2 text-lg mt-4 mb-2">
        <button
          onClick={restart}
          className="border w-26 rounded-lg py-2 px-2 mr-12 bg-pastelbeige hover:bg-darkerpastelbeige"
        >
          Restart
        </button>
        <button
          onClick={loadLikedRestaurants}
          className="border w-26 rounded-lg py-2 px-2 bg-middlepink hover:bg-darkpink"
        >
          Narrow down
        </button>
      </div>
      {index < restaurants.length &&
      restaurants.length > 0 &&
      restaurants.length !== 1 ? (
        <Card restaurant={restaurants[index]} />
      ) : (
        // only show restaurants[0] and instead of incrementing index just remove the first index from restaurants state
        // so then have && restaurants.length > 1, else if === 1 you found a match, else nothing to show
        <div>
          {restaurants.length === 1 ? (
            <div>
              <p className="text-5xl text-center pb-4">You found a match!</p>
              <Card restaurant={restaurants[0]} />
            </div>
          ) : (
            <div className="text-center my-10">
              You've reached the end. <br /> Narrow down to continue with your
              currently liked restaurants!
            </div>
          )}
        </div>
      )}
      <div className="mt-4 flex justify-center w-1/2 text-xl">
        <button
          className="border w-16 py-1 rounded-lg bg-pastelbeige hover:bg-darkerpastelbeige mr-28"
          onClick={() => {
            unlikeRestaurant();
          }}
        >
          No
        </button>
        <button
          className="border w-16 py-1 rounded-lg bg-middlepink hover:bg-darkpink"
          onClick={() => {
            handleInteraction();
            likeRestaurant();
          }}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default Restaurants;
