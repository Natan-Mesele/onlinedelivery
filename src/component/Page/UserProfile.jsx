import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Redux/Auth/Action";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Get user from Redux state
  const loading = useSelector((state) => state.auth.loading); // Get loading state from Redux state
  const error = useSelector((state) => state.auth.error); // Get error state from Redux state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false); // To toggle edit mode

  // Fetch user profile when the component mounts
  useEffect(() => {
    if (!user) {
      dispatch(getUser()); 
    } else {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
    }
  }, [dispatch, user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const updatedUser = {
      firstName,
      lastName,
      email,
    };

    // Dispatch action to update the user information
    dispatch(updateUser(updatedUser));
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    // Revert to initial user data
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setIsEditing(false);
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading message while fetching data
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">User Profile</h2>
      {error && <p className="text-red-500">{error}</p>} {/* Show error if any */}
      <div className="space-y-6">
        {/* First Name */}
        <div className="flex items-center justify-between">
          <label className="text-lg font-medium text-gray-700">First Name</label>
          {isEditing ? (
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-60"
            />
          ) : (
            <p className="text-lg text-gray-600">{firstName}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="flex items-center justify-between">
          <label className="text-lg font-medium text-gray-700">Last Name</label>
          {isEditing ? (
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-60"
            />
          ) : (
            <p className="text-lg text-gray-600">{lastName}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex items-center justify-between">
          <label className="text-lg font-medium text-gray-700">Email</label>
          {isEditing ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 w-60"
            />
          ) : (
            <p className="text-lg text-gray-600">{email}</p>
          )}
        </div>
      </div>

      {/* Buttons for Edit/Save/Cancel */}
      <div className="mt-6 flex space-x-4 justify-center">
        {isEditing ? (
          <>
            <button
              onClick={handleSaveClick}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancelClick}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleEditClick}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
