import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Importing the style for phone number input
import { register } from "../../Redux/Auth/Action";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const [locationDescription, setLocationDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // State for phone number

  const dispatch = useDispatch(); // Hook to dispatch actions

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phoneNumber,
      location,
      locationDescription,
    };

    // Dispatch the register action
    dispatch(register(userData));
    console.log("Register action dispatched with:", userData);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
      <form className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6" onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="John"
            required
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Doe"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <PhoneInput
            country="US"
            value={phoneNumber}
            onChange={setPhoneNumber} // Update phone number state
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Email Address */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Create a Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="********"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="********"
            required
          />
        </div>

        {/* Location Name */}
        <div className="mb-4">
          <label htmlFor="locationName" className="block text-sm font-medium text-gray-700">
            What would you like to call your first location?
          </label>
          <input
            type="text"
            id="locationName"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Home, Office, etc."
            required
          />
        </div>

        {/* Location Description */}
        <div className="mb-4">
          <label htmlFor="locationDescription" className="block text-sm font-medium text-gray-700">
            Tell us more about this location
          </label>
          <textarea
            id="locationDescription"
            value={locationDescription}
            onChange={(e) => setLocationDescription(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="E.g., Apartment 4B, near the big park."
            rows="3"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
