import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const RestaurantCard = ({ id, name, images, description, rating, open }) => {
  console.log("RestaurantCard Props:", { id, name, images, description, rating, open });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const isUserLoggedIn = user !== null;
  const starRating = parseFloat(rating);

  // Ensure open is a boolean (in case it comes as a string)
  const isRestaurantOpen = typeof open === "boolean" ? open : open === "true";

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

  const handleCardClick = () => {
    if (!isUserLoggedIn) {
      alert("You must log in to view the restaurant details.");
      navigate("/login"); // Redirect user to login page if not logged in
    } else {
      navigate(`/restaurant/${id}`); // Navigate to restaurant details page if logged in
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div
        className="cursor-pointer"
        onClick={handleCardClick} // Handle click on restaurant card
      >
        <img
          src={images}
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
          <div
            className={`mt-4 text-sm font-semibold ${open ? "text-green-500" : "text-red-500"}`}
          >
            {open ? "Open Now" : "Closed"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
