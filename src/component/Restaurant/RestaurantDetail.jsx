import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa"; // Importing a cart icon from react-icons

const RestaurantDetail = () => {
  const location = useLocation();
  const { id, name, image, description, rating, isOpen, deliveryDay } = location.state || {};

  const [activeFoodType, setActiveFoodType] = useState("vegetarian");
  const [cartItems, setCartItems] = useState([]);

  // Dummy data for food items based on type
  const foodData = {
    vegetarian: [
      { name: "Vegetable Curry", description: "A rich and hearty curry with mixed vegetables", price: 100 },
      { name: "Tofu Stir Fry", description: "Stir-fried tofu with fresh veggies and soy sauce", price: 120 },
      { name: "Vegetable Salad", description: "Fresh and crisp salad with a variety of vegetables", price: 80 },
      { name: "Vegetable Curry", description: "A rich and hearty curry with mixed vegetables", price: 100 },
      { name: "Tofu Stir Fry", description: "Stir-fried tofu with fresh veggies and soy sauce", price: 120 },
      { name: "Vegetable Salad", description: "Fresh and crisp salad with a variety of vegetables", price: 80 },
    ],
    nonVegetarian: [
      { name: "Chicken Biryani", description: "Flavorful basmati rice with spiced chicken", price: 150 },
      { name: "Grilled Chicken", description: "Juicy grilled chicken with herbs and spices", price: 130 },
      { name: "Beef Steak", description: "Tender beef steak cooked to perfection", price: 200 },
    ],
  };

  const addToCart = (food) => {
    setCartItems([...cartItems, food]);
    alert(`${food.name} added to cart`);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const renderStars = () => {
    let stars = [];
    const starRating = parseFloat(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-yellow-500 ${i <= starRating ? "filled" : "empty"}`}>★</span>
      );
    }
    return stars;
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Restaurant Header */}
      <div
        className="relative w-full h-[400px] object-cover bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="absolute"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-white text-left px-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-200">{name}</h1>
            <p className="text-lg mt-4">{description}</p>
          </div>
        </div>
      </div>

      {/* Restaurant Details */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Details</h2>
        <div className="mt-4 text-lg text-gray-600">
          <p><strong>Rating:</strong> {renderStars()} {rating} Rating</p>
          <p><strong>Status:</strong> {isOpen ? "Open Now" : "Closed"}</p>
          <p><strong>Delivery Day:</strong> {deliveryDay}</p>
        </div>
      </div>

      {/* Food Type, Menu, and Checkout */}
      <div className="mt-8 flex space-x-6">
        {/* Food Types (Left) */}
        <div className="flex flex-col w-1/4 bg-gray-100 p-4 rounded-lg h-[400px]">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Food Types</h3>
          <button
            className={`text-left px-4 py-2 rounded-lg mb-2 ${activeFoodType === "vegetarian" ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            onClick={() => setActiveFoodType("vegetarian")}
          >
            Vegetarian Dishes
          </button>
          <button
            className={`text-left px-4 py-2 rounded-lg ${activeFoodType === "nonVegetarian" ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            onClick={() => setActiveFoodType("nonVegetarian")}
          >
            Non-Vegetarian Dishes
          </button>
        </div>

        {/* Food Menu (Middle) */}
        <div className="flex-grow bg-white p-4 rounded-lg shadow-lg">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">Food Menu</h4>
          <div className="flex flex-col space-y-4">
            {foodData[activeFoodType].map((food, index) => (
              <div
                key={index}
                className="py-2 border-b"
              >
                {/* Food Name */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">{food.name}</span>
                  <span className="text-lg font-semibold text-gray-800">{food.price} ETB</span>
                </div>

                {/* Food Description */}
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600 mt-1">{food.description}</p>

                  {/* Cart Icon */}
                  <button
                    className="mt-2 bg-green-500 hover:bg-green-600 text-white p-2 rounded-full"
                    onClick={() => addToCart(food)}
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checkout Section (Right) */}
        <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-lg h-[400px]">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">Checkout</h4>
          {cartItems.length > 0 ? (
            <div>
              <ul className="mb-4 space-y-2">
                {cartItems.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span className="text-gray-800">{item.name}</span>
                    <span className="text-gray-800">{item.price} ETB</span>
                  </li>
                ))}
              </ul>
              <hr className="my-2" />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>{calculateTotal()} ETB</span>
              </div>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg mt-4">
                Proceed to Checkout
              </button>
            </div>
          ) : (
            <p className="text-gray-600">Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
