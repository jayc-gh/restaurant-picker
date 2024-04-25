import React, { useState, useEffect } from 'react';

const Card = ({ restaurant }) => {
  return (
    <div className="border flex flex-col w-96 mx-auto rounded-2xl bg-offwhite">
      <img
        src={restaurant.image_url}
        className="h-96 object-cover rounded-t-2xl"
      />
      <div className="ml-4 my-4">
        <p className="text-2xl font-bold">{restaurant.name}</p>
        <p>Rating: {restaurant.rating}/5</p>
        <p>Address: {restaurant.location.address1}</p>
        <p>Price: {restaurant.price}</p>
        <p>Distance: {(restaurant.distance / 1609.344).toFixed(1)}mi</p>
      </div>
    </div>
  );
};

export default Card;
