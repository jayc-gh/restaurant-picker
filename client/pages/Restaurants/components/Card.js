import React, { useState, useEffect } from 'react';

const Card = ({ restaurant }) => {
  return (
    <div className="border">
      <img src={restaurant.image_url} className="object-cover" />
      <div>
        <p className="text-xl">{restaurant.name}</p>
        <p>Rating: {restaurant.rating}</p>
        <p>Address: {restaurant.location.address1}</p>
      </div>
    </div>
  );
};

export default Card;
