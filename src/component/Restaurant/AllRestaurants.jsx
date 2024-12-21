// src/component/Restaurant/AllRestaurants.jsx
import React, { useState } from "react";
import RestaurantCard from "./RestaurantCard"; // Assuming you already have the RestaurantCard component
import { FaFilter } from "react-icons/fa"; // Importing filter icon

const AllRestaurants = () => {
    // Sample data for all restaurants (this can be fetched from an API in a real-world scenario)
    const restaurants = [
        {
            id: 1,
            name: "Pasta Palace",
            image: "https://images.unsplash.com/photo-1484980972926-edee96e0960d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "Delicious homemade pasta with a wide variety of sauces.",
            rating: "4.7",
            isOpen: true
        },
        {
            id: 2,
            name: "Burger Haven",
            image: "https://images.unsplash.com/photo-1523218345414-cd47aea19ba6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "Serving the best burgers with fresh ingredients and a variety of toppings.",
            rating: "4.5",
            isOpen: false
        },
        {
            id: 3,
            name: "Sushi World",
            image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1453&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "Fresh sushi and Japanese dishes for sushi lovers.",
            rating: "4.9",
            isOpen: true
        }
    ];

    // State to hold the search query, filter for open restaurants, and sort option
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpenOnly, setIsOpenOnly] = useState(false);
    const [sortOption, setSortOption] = useState("rating"); // Default to sorting by rating

    // Filter and sort restaurants based on the search query, open status, and sort option
    const filteredRestaurants = restaurants
        .filter(
            (restaurant) =>
                (restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    restaurant.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
                (!isOpenOnly || restaurant.isOpen)
        )
        .sort((a, b) => {
            if (sortOption === "rating") {
                return parseFloat(b.rating) - parseFloat(a.rating); // Sort by rating (highest first)
            } else if (sortOption === "name") {
                return a.name.localeCompare(b.name); // Sort by name alphabetically
            }
            return 0;
        });

    return (
        <div className="py-12 px-6 flex gap-16 mx-auto max-w-7xl">
            {/* Filter and Sort Section */}
            <div className=" flex flex-col">
                <div className="flex items-center gap-4 ">
                    <FaFilter className="text-gray-600 text" />
                    <label className="text-lg font-semibold text-gray-800">Filter By:</label>
                </div>

                {/* Filter by Open Restaurants */}
                <div className="flex items-center gap-2 my-6 ">
                    <input
                        type="checkbox"
                        id="openOnly"
                        checked={isOpenOnly}
                        onChange={() => setIsOpenOnly(!isOpenOnly)}
                        className="h-4 w-4"
                    />
                    <label htmlFor="openOnly" className="text-sm font-semibold text-gray-800">
                        Open Now
                    </label>
                </div>

                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search for a restaurant..."
                    className="w-full px-8 py-1 border border-gray-300 rounded-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Display filtered and sorted restaurants */}
            <div className="flex flex-col gap-16 ">
                {/* Sort By Dropdown */}
                <div className="flex items-center gap-4 ml-4">
                    <label className="text-lg font-semibold text-gray-800">Sort By:</label>
                    <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg"
                    >
                        <option value="rating">Highest Rated</option>
                        <option value="name">Name</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRestaurants.length > 0 ? (
                        filteredRestaurants.map((restaurant) => (
                            <RestaurantCard
                                key={restaurant.id}
                                id={restaurant.id}
                                name={restaurant.name}
                                image={restaurant.image}
                                description={restaurant.description}
                                rating={restaurant.rating}
                                isOpen={restaurant.isOpen}
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No restaurants found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllRestaurants;
