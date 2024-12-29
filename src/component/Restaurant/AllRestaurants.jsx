// src/component/Restaurant/AllRestaurants.jsx
import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import RestaurantCard from "./RestaurantCard"; // Assuming you already have the RestaurantCard component
import { FaFilter } from "react-icons/fa"; // Importing filter icon

const AllRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // States for filtering and sorting
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpenOnly, setIsOpenOnly] = useState(false);
    const [sortOption, setSortOption] = useState("rating");

    // Fetch restaurants from the API
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await axios.get("http://localhost:8080/restaurants"); 
                setRestaurants(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch restaurants");
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);
    
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
