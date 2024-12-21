import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./component/Page/Header";
import SignUp from "./component/Auth/SignUp";
import HomePage from "./component/Page/HomePage";
import RestaurantDetail from "./component/Restaurant/RestaurantDetail";
import AllRestaurants from "./component/Restaurant/AllRestaurants";
import DrinksPage from "./component/Restaurant/DrinksPage";
import NearbyRestaurantsPage from "./component/Restaurant/NearbyRestaurantsPage";

const App = () => {
  return (
    <div>
      {/* Header Component */}
      <Header />

      {/* Routes for different pages */}
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        <Route path="/restaurants" element={<AllRestaurants />} />
        <Route path="/drinks" element={<DrinksPage />} />
        <Route path="/nearby" element={<NearbyRestaurantsPage />} />
      </Routes>
    </div>
  );
};

export default App;
