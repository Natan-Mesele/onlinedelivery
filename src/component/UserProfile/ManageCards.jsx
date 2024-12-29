import React from "react";

const ManageCards = () => (
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">
      Manage Your Cards
    </h3>
    <ul className="space-y-4">
      <li className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow">
        <div>
          <p className="text-gray-700">Card Ending in 1234</p>
          <p className="text-gray-500 text-sm">Expires 12/24</p>
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
          Remove
        </button>
      </li>
      <li className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow">
        <div>
          <p className="text-gray-700">Card Ending in 5678</p>
          <p className="text-gray-500 text-sm">Expires 10/23</p>
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
          Remove
        </button>
      </li>
    </ul>
  </div>
);

export default ManageCards;
