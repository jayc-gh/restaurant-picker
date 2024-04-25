import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import { useNavigate } from 'react-router-dom';

const Restaurants = ({ params }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
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
      })
      .catch(err => console.log(err));
  }, [params]);

  const handleInteraction = () => {
    setIndex(index + 1);
  };

  const likeRestaurant = () => {
    // post request to store liked restaurant
    fetch('http://localhost:3000/restaurants', {
      method: 'POST',
      body: JSON.stringify(restaurants[index]),
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(err => console.log(err));
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
    <div>
      {index < restaurants.length ? (
        <Card restaurant={restaurants[index]} />
      ) : (
        <h2>
          {restaurants.length === 1 ? (
            <>
              <Card restaurant={restaurants[0]} />
              <p>You've found a match!</p>
            </>
          ) : (
            'Nothing to show!'
          )}
        </h2>
      )}
      <button
        onClick={() => {
          handleInteraction();
        }}
      >
        No
      </button>
      <button
        onClick={() => {
          handleInteraction();
          likeRestaurant();
        }}
      >
        Yes
      </button>
      <button onClick={loadLikedRestaurants}>Narrow down choices</button>
      <button onClick={restart}>Start Over</button>
    </div>
  );
};

export default Restaurants;
