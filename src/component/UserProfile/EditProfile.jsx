import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../Redux/Auth/Action";

const EditProfile = () => {
  // Fetch user data from Redux store or any other source (e.g., API)
  const user = useSelector((state) => state.auth.user); // Assuming user data is in Redux state

  // Initialize state variables with default empty strings or user data (if available)
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [locationDescription, setLocationDescription] = useState(user?.locationDescription || "");
  const [locationName, setLocationName] = useState(user?.locationName || "");

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setPhoneNumber(user.phoneNumber || "");
      setLocationDescription(user.locationDescription || "");
      setLocationName(user.locationName || "");
    }
  }, [user]);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Collect the updated data from the form
    const updatedData = {
      firstName,
      lastName,
      email,
      phoneNumber,
      locationDescription,
      locationName,
    };

    // Dispatch the updateProfile action
    dispatch(updateProfile(updatedData));

    // Optionally, you can reset the form or show a success message here
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Update Profile</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Last Name Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Phone Number Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Location Description Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Location Description</label>
          <textarea
            value={locationDescription}
            onChange={(e) => setLocationDescription(e.target.value)}
            placeholder="Enter your location description"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            rows="4"
          ></textarea>
        </div>

        {/* Location Name Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Location Name</label>
          <input
            type="text"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            placeholder="Enter your location name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
