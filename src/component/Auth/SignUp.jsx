import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'; // Importing the style for phone number input

const SignUp = () => {
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // State for phone number

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    // Handle form submission logic here
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
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="********"
            required
          />
        </div>

        {/* Delivery Location Information */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            To ensure your order gets to you as quickly as possible, we use GPS coordinates to locate you.
            Create your first delivery location below by telling us more about where you are and pinning your location on the map below. 
            It is very important that your pin is accurate; otherwise, your order may take longer than expected to deliver.
          </p>
        </div>

        {/* Location Name */}
        <div className="mb-4">
          <label htmlFor="locationName" className="block text-sm font-medium text-gray-700">
            What would you like to call your first location?
          </label>
          <input
            type="text"
            id="locationName"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Home, Office, etc."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="E.g., Apartment 4B, near the big park."
            rows="3"
          />
        </div>

        {/* Map for Pinning Location */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pin Your Location
          </label>
          <div className="h-64 w-full border border-gray-300 rounded-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d18499.68485934746!2d38.495503500000005!3d7.032923149999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2set!4v1734769639723!5m2!1sen!2set"
              width="100%" 
              height="450" 
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64"
            ></iframe>
          </div>
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
