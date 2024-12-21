import React from "react";
import RestaurantCard from "./RestaurantCard";

const FeaturedRestaurants = () => {
  const restaurants = [
    {
      name: "Pasta Palace",
      image: "https://images.unsplash.com/photo-1623407176536-6b5a8c020bd8?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Delicious homemade pasta with a wide variety of sauces.",
      rating: "4.7",
      isOpen: true, // Restaurant is open
    },
    {
      name: "Burger Haven",
      image: "https://plus.unsplash.com/premium_photo-1661433201283-fcb240e88ad4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Serving the best burgers with fresh ingredients and a variety of toppings.",
      rating: "4.5",
      isOpen: false, // Restaurant is closed
    },
    {
      name: "Sushi World",
      image: "https://plus.unsplash.com/premium_photo-1686090448301-4c453ee74718?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Fresh sushi and Japanese dishes for sushi lovers.",
      rating: "4.9",
      isOpen: true, // Restaurant is open
    },
    {
      name: "Vegan Delight",
      image: "https://images.unsplash.com/photo-1542095496-1ee6599fe563?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Healthy, plant-based meals that will satisfy any appetite.",
      rating: "4.8",
      isOpen: false, // Restaurant is closed
    }
  ];

  return (
    <div className="py-12 px-6 mx-auto max-w-7xl">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Featured Restaurants
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant, index) => (
          <RestaurantCard
            key={index}
            name={restaurant.name}
            image={restaurant.image}
            description={restaurant.description}
            rating={restaurant.rating}
            isOpen={restaurant.isOpen} // Passing isOpen status
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedRestaurants;
