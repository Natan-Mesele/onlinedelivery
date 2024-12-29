import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCart } from '../../Redux/Cart/Action'; // Adjust the path as per your project structure

function CheckOut() {
  const dispatch = useDispatch();

  // Fetch user ID from Redux
  const userId = useSelector((state) => state.auth.user?.id); 
  const cartItems = useSelector((state) => Array.isArray(state.cart.cartItems) ? state.cart.cartItems : []); // Ensure cartItems is always an array
  const loading = useSelector((state) => state.cart.loading); // Loading state for cart data
  const error = useSelector((state) => state.cart.error); // Error state for cart data

  // Fetch cart items when the component mounts
  useEffect(() => {
    if (userId) {
      dispatch(getCart(userId)); // Pass the userId to fetch the cart data
    }
  }, [dispatch, userId]);

  // Calculate the total price of items in the cart
  const totalPrice = cartItems.reduce((total, item) => total + (item.totalPrice || 0), 0);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {loading ? (
        <p>Loading your cart...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <div className="space-y-4">
            {/* Render Cart Items */}
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between items-center border-b py-2">
                <div className="flex items-center">
                  {/* Optional: Add a fallback for images */}
                  <img
                    src={item.foodMenu?.foodType?.restaurant?.images[0] || 'placeholder-image-url'}
                    alt={item.foodMenu?.title || 'Food Image'}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.foodMenu?.title}</h3>
                    <p className="text-sm text-gray-600">{item.foodMenu?.description}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600">x{item.quantity}</span>
                  <span className="ml-4 font-semibold">
                    {item.totalPrice?.toFixed(2)} ETB
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center font-semibold">
            <span>Total:</span>
            <span>{totalPrice.toFixed(2)} ETB</span>
          </div>
          <div className="mt-6">
            {/* Proceed to Payment */}
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckOut;
