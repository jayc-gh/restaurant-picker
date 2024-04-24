import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cuisines from './components/Cuisines';
import Radius from './components/Radius';

const Welcome = () => {
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

  const deleteCuisine = i => {
    const newCuisineList = [...cuisineList];
    newCuisineList.splice(i, 1);
    setCuisineList(newCuisineList);
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
      <Radius />
      <button
        onClick={handleNext}
        className="py-3 px-5 bg-violet-500 rounded-lg"
      >
        Find Restaurants!
      </button>
    </div>
  );
};

export default Welcome;
