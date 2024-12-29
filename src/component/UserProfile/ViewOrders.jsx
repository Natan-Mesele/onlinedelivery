import React from "react";

const ViewOrders = () => (
  <div>
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Your Orders</h3>
    <p className="text-gray-600">You have 3 orders:</p>
    <ul className="list-disc pl-6 mt-2">
      <li>Order #1234 - Delivered</li>
      <li>Order #5678 - In Transit</li>
      <li>Order #9101 - Pending</li>
    </ul>
  </div>
);

export default ViewOrders;
