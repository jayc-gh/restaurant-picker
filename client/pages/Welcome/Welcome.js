import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cuisines from './components/Cuisines';
import Radius from './components/Radius';
import LikedCard from './components/LikedCard';

const Welcome = ({ handleSetParams }) => {
  const [saved, setSaved] = useState([]);
  // handle redirecting to a different page
  // useEffect to make sure we only redirect after params are set
  const [paramsSet, setParamsSet] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (paramsSet) {
      navigate('/restaurants');
    }
  }, [paramsSet]);

  useEffect(() => {
    fetch('http://localhost:3000/getSaved', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log('got fetch data');
        console.log(data);
        setSaved(data);
      })
      .catch(err => console.log(err));
  }, []);
  // radius state which gets updated in Radius.js input slider
  const [radius, setRadius] = useState(12);
  const handleRadiusChange = e => {
    setRadius(e.target.value);
  };

  // managing list of cuisines state
  const [cuisineList, setCuisineList] = useState([]);
  const addCuisine = newCuisine => {
    setCuisineList([...cuisineList, newCuisine]);
  };

  // handling deleting cuisine on click
  const deleteCuisine = i => {
    const newCuisineList = [...cuisineList];
    newCuisineList.splice(i, 1);
    setCuisineList(newCuisineList);
  };

  // defining parameters which will ultimately be used to
  // send api request in restaurants.js
  const setParams = () => {
    // built-in geolocation api to get current location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const term = 'restaurants';
        const categories = cuisineList
          .map(cuisine => `categories=${cuisine.toLowerCase()}`)
          .join('&');
        const params = {
          term,
          categories,
          latitude,
          longitude,
          radius: Math.round(radius * 1609.344),
          limit: 30,
        };
        handleSetParams(params);
        setParamsSet(true);
      });
    }
  };

  return (
    <div className="text-center mt-36">
      <h1 className="mb-10 text-5xl">Let's get started!</h1>
      <Cuisines addCuisine={addCuisine} />
      <div className="mb-5">
        <h2>Selected Cuisines:</h2>
        <div className="flex flex-wrap justify-center w-3/4 mx-auto">
          {cuisineList.map((cuisine, i) => (
            <div
              className="border bg-pastelbeige px-2 cursor-pointer rounded-lg mx-1"
              key={cuisine}
              onClick={() => deleteCuisine(i)}
            >
              {cuisine}
            </div>
          ))}
        </div>
      </div>
      <Radius handleRadiusChange={handleRadiusChange} radius={radius} />
      <button
        onClick={() => {
          setParams();
        }}
        className="py-3 px-5 bg-violet-500 border rounded-xl mb-4 bg-middlepink hover:bg-darkpink"
      >
        Find Restaurants!
      </button>
      <h2 className="mb-4">Previously Liked Restaurants:</h2>
      <div className="flex">
        {saved.length > 0 &&
          saved.map((restaurant, index) => (
            <LikedCard key={index} restaurant={restaurant} />
          ))}
      </div>
    </div>
  );
};

export default Welcome;
