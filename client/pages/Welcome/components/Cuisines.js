import React, { useState } from 'react';
import '../../../index.css';

const Cuisines = ({ addCuisine }) => {
  const [newCuisine, setNewCuisine] = useState('');

  const handleNewCuisine = e => {
    setNewCuisine(e.target.value);
  };

  const handleAddCuisine = () => {
    addCuisine(newCuisine);
    setNewCuisine('');
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      addCuisine(newCuisine);
      setNewCuisine('');
    }
  };
  return (
    <div className="center-items">
      <h2 className="text-xl mb-2">What are you feeling?</h2>
      <div className="relative flex items-center justify-center mb-2">
        <input
          type="text"
          placeholder="Add cuisine"
          value={newCuisine}
          onChange={handleNewCuisine}
          onKeyDown={handleKeyPress}
          className="w-3/4 h-8 pr-8 pl-4 outline-none rounded-full"
        ></input>
        <button
          onClick={handleAddCuisine}
          className="absolute right-8 bg-violet-700 text-white px-2 border rounded-full bg-pastelbeige"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Cuisines;
