import React, { useState, useEffect } from 'react';

const LikedCard = ({ restaurant }) => {
  return (
    <div className="border flex flex-col w-44 mx-auto rounded-2xl bg-offwhite">
      <img
        src={restaurant.image_url}
        className="h-32 object-cover rounded-t-2xl"
      />
      <div className="ml-4 my-4 text-left">
        <p className="text-md font-bold mb-2">{restaurant.name}</p>
        <p className="text-sm">Rating: {restaurant.rating}/5</p>
        <p className="text-sm">Address: {restaurant.location.address1}</p>
      </div>
    </div>
  );
};

export default LikedCard;
