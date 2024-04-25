import React, { useState } from 'react';
import '../../../index.css';

const Radius = ({ handleRadiusChange, radius }) => {
  return (
    <div className="center-items mb-5">
      <h2 className="text-xl">Search Radius</h2>
      <input
        type="range"
        min="0"
        max="24"
        value={radius}
        onChange={handleRadiusChange}
        className="w-1/3 accent-offwhite"
      ></input>
      <p>{radius}mi</p>
    </div>
  );
};

export default Radius;
