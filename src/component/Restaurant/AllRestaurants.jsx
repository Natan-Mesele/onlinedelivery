import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { FaFilter } from "react-icons/fa";
import { fetchRestaurantById, getAllRestaurants } from "../../Redux/Restaurant/Action";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

const AllRestaurants = () => {
    const { id } = useParams();
    const loading = useSelector((state) => state.restaurant.loading);
    const error = useSelector((state) => state.restaurant.error);
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpenOnly, setIsOpenOnly] = useState(false);
    const [sortOption, setSortOption] = useState("rating");
    const [currentPage, setCurrentPage] = useState(1); // Added state for current page
    const [pageSize, setPageSize] = useState(9); // Added state for page size
    const [restaurants, setRestaurants] = useState([]); // Add setRestaurants here
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);

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

    useEffect(() => {
        fetchRestaurants();
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(fetchRestaurantById(id));
        }
    }, [dispatch, id]);

    const filteredRestaurants = restaurants
        .filter(
            (restaurant) =>
                (restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    restaurant.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
                (!isOpenOnly || restaurant.open)
        )
        .sort((a, b) => {
            if (sortOption === "rating") {
                return parseFloat(b.rating) - parseFloat(a.rating); // Sort by rating (highest first)
            } else if (sortOption === "name") {
                return a.name.localeCompare(b.name); // Sort by name alphabetically
            }
            return 0;
        });

    // Pagination logic
    const totalRestaurants = filteredRestaurants.length;
    const totalPages = Math.ceil(totalRestaurants / pageSize);
    const displayedRestaurants = filteredRestaurants.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    // Calculate total number of items in the cart
    const totalItemsInCart = Array.isArray(cartItems)
        ? cartItems.reduce((total, item) => total + item.quantity, 0)
        : 0;

    return (
        <div className="py-12 px-6 flex gap-16 mx-auto max-w-7xl">
            {/* Filter and Sort Section */}
            <div className=" flex flex-col">
                <div className="flex items-center gap-2 ">
                    <FaFilter className="text-gray-600 text" />
                    <span className="text-lg font-semibold text-gray-800 whitespace-nowrap">Filter By:</span>
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
                    {displayedRestaurants.length > 0 ? (
                        displayedRestaurants.map((restaurant) => (
                            <RestaurantCard
                                key={restaurant.id}
                                id={restaurant.id}
                                name={restaurant.name}
                                images={restaurant.images}
                                description={restaurant.description}
                                rating={restaurant.rating}
                                open={restaurant.open}
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No restaurants found</p>
                    )}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center gap-4 my-6">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-300 text-white rounded-lg disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span className="text-lg font-semibold">{currentPage} / {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-300 text-white rounded-lg disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllRestaurants;
