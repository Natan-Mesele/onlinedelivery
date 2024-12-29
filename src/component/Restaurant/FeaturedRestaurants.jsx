import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurantById, getAllRestaurants, updateRestaurantStatus } from "../../Redux/Restaurant/Action";
import { useParams } from "react-router-dom";

const FeaturedRestaurants = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector((state) => state.restaurant.restaurants); 
  const loading = useSelector((state) => state.restaurant.loading);
  const error = useSelector((state) => state.restaurant.error);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchRestaurantById(id));
    }
  }, [dispatch, id]);

  const handleStatusUpdate = (id) => {
    dispatch(updateRestaurantStatus({ id, jwt: localStorage.getItem("jwt") }));
    const updatedRestaurants = restaurants.map((restaurant) =>
      restaurant.id === id
        ? { ...restaurant, isOpen: !restaurant.isOpen }
        : restaurant
    );
    setRestaurants(updatedRestaurants);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="py-12 px-6 mx-auto max-w-7xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Featured Restaurants
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            id={restaurant.id}
            name={restaurant.name}
            images={restaurant.images}
            description={restaurant.description}
            rating={restaurant.rating}
            open={restaurant.open}
            onStatusUpdate={handleStatusUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedRestaurants;
