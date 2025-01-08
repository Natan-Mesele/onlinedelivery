import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import axios from "axios";

const FeaturedRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]); // Ensure initial state is an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // State to store the selected restaurant's details

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get("http://localhost:8080/restaurant"); // Replace with your actual API endpoint
      console.log(response.data); // Log data for debugging
      if (Array.isArray(response.data)) {
        setRestaurants(response.data); // Ensure data is an array
      } else {
        throw new Error("Invalid data format. Expected an array.");
      }
      setLoading(false);
    } catch (err) {
      console.error(err); // Log error for debugging
      setError("Failed to fetch restaurants.");
      setLoading(false);
    }
  };

  const fetchRestaurantById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/restaurant/${id}`); // Fetch restaurant details by ID
      console.log(response.data); // Log data for debugging
      setSelectedRestaurant(response.data); // Set the details of the selected restaurant
    } catch (err) {
      console.error(err); // Log error for debugging
      setError("Failed to fetch restaurant details.");
    }
  };

  const updateRestaurantStatus = async (id) => {
    try {
      const jwt = localStorage.getItem("jwt");
      await axios.patch(
        `/api/restaurants/${id}/status`, // Replace with your actual API endpoint
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      // Optimistically update the UI
      setRestaurants((prevRestaurants) =>
        prevRestaurants.map((restaurant) =>
          restaurant.id === id
            ? { ...restaurant, isOpen: !restaurant.isOpen }
            : restaurant
        )
      );
    } catch (err) {
      setError("Failed to update restaurant status.");
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleCardClick = (id) => {
    fetchRestaurantById(id); // Fetch restaurant details when a card is clicked
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const featuredRestaurants = restaurants.slice(0, 5);

  return (
    <div className="py-12 px-6 mx-auto max-w-7xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Featured Restaurants
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredRestaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            id={restaurant.id}
            name={restaurant.name}
            images={restaurant.images}
            description={restaurant.description}
            rating={restaurant.rating}
            open={restaurant.open}
            onStatusUpdate={updateRestaurantStatus}
            onClick={() => handleCardClick(restaurant.id)} // Handle click to fetch restaurant details
          />
        ))}
      </div>

      {selectedRestaurant && (
        <div className="mt-8 p-6 bg-white shadow-lg rounded-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            {selectedRestaurant.name}
          </h3>
          <img
            src={selectedRestaurant.images[0]} // Display the first image as an example
            alt={selectedRestaurant.name}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="text-gray-700 mb-4">{selectedRestaurant.description}</p>
          <p className="text-gray-500">Rating: {selectedRestaurant.rating}</p>
          <p className="text-gray-500">
            Status: {selectedRestaurant.isOpen ? "Open" : "Closed"}
          </p>
        </div>
      )}
    </div>
  );
};

export default FeaturedRestaurants;
