import React from "react";

const ChangePassword = () => (
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">
      Change Password
    </h3>
    <form className="space-y-4">
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Current Password
        </label>
        <input
          type="password"
          placeholder="Enter current password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          New Password
        </label>
        <input
          type="password"
          placeholder="Enter new password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Update Password
      </button>
    </form>
  </div>
);

export default ChangePassword;
