import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate("/signup"); // Navigate to the Sign-Up page
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800">
          <a href="/">OnlineDelivery</a>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <a href="/restaurant" className="text-gray-700 hover:text-gray-900">
            Restaurant
          </a>
          <a href="/drinks" className="text-gray-700 hover:text-gray-900">
            Drinks
          </a>
          <a href="/market" className="text-gray-700 hover:text-gray-900">
            Market
          </a>
          <a href="/more" className="text-gray-700 hover:text-gray-900">
            More
          </a>
        </nav>

        {/* Login Dropdown */}
        <div className="relative">
          {/* Login Button */}
          <button
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Login
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-80 p-6 z-50">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Log in to your account
              </h4>
              {/* Login Form */}
              <form>
                {/* Email Field */}
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="you@example.com"
                  />
                </div>

                {/* Password Field */}
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Log In
                </button>
              </form>

              {/* Other Options */}
              <div className="mt-4 text-sm text-gray-600">
                <p className="text-center">
                  Don't have an account?{" "}
                  <button
                    onClick={handleCreateAccount}
                    className="text-blue-500 hover:underline"
                  >
                    Create Account
                  </button>
                </p>
                <p className="text-center mt-2">
                  <a
                    href="/forgot-password"
                    className="text-blue-500 hover:underline"
                  >
                    Forgot Password?
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
