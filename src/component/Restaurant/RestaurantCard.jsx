import React from "react";
import { FaStar } from "react-icons/fa"; 
import { Link } from "react-router-dom"; 

const RestaurantCard = ({ id, name, image, description, rating, isOpen, deliveryDay }) => {
  const starRating = parseFloat(rating); 

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`text-yellow-500 ${i <= starRating ? "filled" : "empty"}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <Link to={{ pathname: `/restaurant/${id}`, state: { id, name, image, description, rating, isOpen, deliveryDay } }}>
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-600 mt-2">{description}</p>
          <div className="mt-2 flex items-center">
            <div className="flex">{renderStars()}</div>
            <span className="ml-2 text-gray-500">{rating} Rating</span>
          </div>
          <div className={`mt-4 text-sm font-semibold ${isOpen ? 'text-green-500' : 'text-red-500'}`}>
            {isOpen ? "Open Now" : "Closed"}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantCard;
