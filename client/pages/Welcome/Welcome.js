import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cuisines from './components/Cuisines';
import Radius from './components/Radius';

const Welcome = () => {
  // built-in geolocation api to get current location
  let latitude;
  let longitude;
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      console.log('Latitude: ', latitude, 'Longitude: ', longitude);
    });
  }

  // radius state which gets updated in Radius.js input slider
  const [radius, setRadius] = useState(10);
  const handleRadiusChange = e => {
    setRadius(e.target.value);
  };

  // managing list of cuisines state
  const [cuisineList, setCuisineList] = useState([]);
  const addCuisine = newCuisine => {
    setCuisineList([...cuisineList, newCuisine]);
  };

  // handle redirecting to a different page
  const navigate = useNavigate();
  const handleNext = () => {
    navigate('/restaurants');
  };

  // handling deleting cuisine on click
  const deleteCuisine = i => {
    const newCuisineList = [...cuisineList];
    newCuisineList.splice(i, 1);
    setCuisineList(newCuisineList);
  };

  // sending search parameters to backend
  const sendParams = () => {
    const term = 'restaurants';
    const cuisines = cuisineList.join(',').toLowerCase();
    const params = {
      term,
      cuisines,
      latitude,
      longitude,
      radius,
      photos: true,
    };

    // post request to send params to backend
    fetch('/welcome', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    }).catch(err => console.log(err));
  };

  return (
    <div className="text-center mt-56">
      <h1 className="m-20 text-5xl">Let's get started!</h1>
      <Cuisines addCuisine={addCuisine} />
      <div className="mb-5">
        <h2>Selected Cuisines:</h2>
        <div className="flex flex-wrap justify-center w-3/4 mx-auto">
          {cuisineList.map((cuisine, i) => (
            <div
              className="px-2 cursor-pointer"
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
          sendParams();
          handleNext();
        }}
        className="py-3 px-5 bg-violet-500 rounded-lg"
      >
        Find Restaurants!
      </button>
    </div>
  );
};

export default Welcome;
