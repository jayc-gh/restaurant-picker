import React, { useState } from 'react';
import '../../../index.css';

const Radius = () => {
  const [value, setValue] = useState(10);

  const handleRadiusChange = e => {
    setValue(e.target.value);
  };
  return (
    <div className="center-items mb-5">
      <h2 className="text-xl">Search Radius</h2>
      <input
        type="range"
        min="0"
        max="50"
        value={value}
        onChange={handleRadiusChange}
        className="w-1/3"
      ></input>
      <p>{value}mi</p>
    </div>
  );
};

export default Radius;
