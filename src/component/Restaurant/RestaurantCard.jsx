import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Redux/Auth/Action";

const RestaurantCard = ({ id, name, images, description, rating, open }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error } = useSelector((state) => state.auth);

  const isUserLoggedIn = !!user;
  const starRating = parseFloat(rating);
  const isRestaurantOpen = typeof open === "boolean" ? open : open === "true";

  useEffect(() => {
    if (!user && !loading) {
      dispatch(getUser());
    }
  }, [dispatch, user, loading]);

  const handleCardClick = () => {
    if (loading) {
      alert("Checking login status, please wait...");
      return;
    }
    if (error) {
      alert("Error checking user status. Please try again.");
      return;
    }
    if (!isUserLoggedIn) {
      alert("You must log in to view the restaurant details.");
      navigate("/");
      return;
    }
    if (!isRestaurantOpen) {
      alert("This restaurant is currently closed.");
      return;
    }
    navigate(`/restaurant/${id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="cursor-pointer" onClick={handleCardClick}>
        <img src={images} alt={name} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-600 mt-2">{description}</p>
          <div className="mt-2 flex items-center">
            <div className="flex">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={`text-yellow-500 ${i + 1 <= starRating ? "filled" : "empty"}`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-500">{rating} Rating</span>
          </div>
          <div
            className={`mt-4 text-sm font-semibold ${
              isRestaurantOpen ? "text-green-500" : "text-red-500"
            }`}
          >
            {isRestaurantOpen ? "Open Now" : "Closed"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
