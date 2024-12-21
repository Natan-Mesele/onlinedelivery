import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import FeaturedRestaurants from "../Restaurant/FeaturedRestaurants";

const HomePage = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div
        className="w-full h-[500px] object-cover"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="absolute"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-left text-white px-6 md:px-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to Our Amazing Platform
            </h1>
            <p className="text-lg mb-8">
              We provide innovative solutions for your needs. Explore our features and services today!
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              {/* Link to Nearby Restaurants page */}
              <Link to="/nearby">
                <button className="text-blue-500 border border-blue-500 py-2 px-6 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300">
                  Restaurants Near You
                </button>
              </Link>
              <Link to="/restaurants">
                <button className="text-blue-500 border border-blue-500 py-2 px-6 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300">
                  View All Our Restaurants
                </button>
              </Link>
              <Link to="/drinks">
                <button className="text-blue-500 border border-blue-500 py-2 px-6 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300">
                  Drinks: Wine, Beer & More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Restaurants Section */}
      <FeaturedRestaurants />
    </div>
  );
};

export default HomePage;
