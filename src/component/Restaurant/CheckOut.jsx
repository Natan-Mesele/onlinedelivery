import React, { useEffect, useState } from 'react';
import AddNewLocation from './Payment/AddNewLocation';
import CreditCardPaymentForm from './Payment/CreditCardPaymentForm';
import { FaCreditCard, FaCashRegister, FaMobileAlt } from 'react-icons/fa';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { getCart } from '../../Redux/Cart/Action';
import { useDispatch, useSelector } from 'react-redux';

function CheckOut() {
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [showCardPopup, setShowCardPopup] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });
  const [paymentMessage, setPaymentMessage] = useState('');
  const [showAddCardButton, setShowAddCardButton] = useState(false);
  const dispatch = useDispatch();
  const cartItemsFromRedux = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value,
    });
  };

  const toggleLocationPopup = () => {
    setShowLocationPopup(!showLocationPopup);
  };

  const toggleCardPopup = () => {
    setShowCardPopup(!showCardPopup);
  };

  const handleLocationSave = (location) => {
    console.log('Location saved:', location);
    // Save the location, if needed
  };

  // Sample data for the order items
  const orderItems = [
    { item: 'Pizza', quantity: 2, price: 12.99 },
    { item: 'Burger', quantity: 1, price: 8.99 },
    { item: 'Soda', quantity: 3, price: 2.49 },
  ];

  const totalPrice = Array.isArray(cartItemsFromRedux)
    ? cartItemsFromRedux.reduce(
      (acc, item) => acc + item.quantity * item.foodMenu.price,
      0
    )
    : 0;

  const handlePaymentOptionClick = (option) => {
    if (option === 'cash') {
      setPaymentMessage('You have selected Cash on Delivery.');
      setShowAddCardButton(false);
    } else if (option === 'telebirr') {
      setPaymentMessage('You have selected Telebirr.');
      setShowAddCardButton(false);
    } else {
      setPaymentMessage('You have selected International Credit/Debit Card.');
      setShowAddCardButton(true);
    }
  };

  const handleAddNewCardClick = () => {
    setShowCardPopup(true);
  };

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <div className="lg:flex gap-8">
        {/* Left section for text */}
        <div className="lg:w-1/4 w-full mb-6 lg:mb-0">
          <h1 className="text-3xl font-bold mb-4">CheckOut</h1>
          <p className="text-sm text-gray-600">
            To complete your order, please ensure your location details are correct, add any notes, include your payment details, and click the check-out button at the bottom to confirm.
          </p>
        </div>

        {/* Right section for form (location and payment buttons) */}
        <div className="lg:w-2/3 w-full">
          <div>
            <h2 className='text-xl'>1. Select a saved location to deliver to</h2>
            <button
              onClick={toggleLocationPopup} // Trigger location popup
              type="button"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
            >
              Add New Location
            </button>
            {/* Add map here */}
            <div className="my-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d18499.68485934746!2d38.495503500000005!3d7.032923149999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2set!4v1735568094312!5m2!1sen!2set"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div>
            <h2 className='text-xl'>2. Confirm your order details</h2>
            {cartItemsFromRedux?.items && cartItemsFromRedux.items.length > 0 ? (
              <table className="min-w-full table-auto mt-4">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b text-left">Item</th>
                    <th className="px-4 py-2 border-b text-left">Quantity</th>
                    <th className="px-4 py-2 border-b text-left">Price</th>
                    <th className="px-4 py-2 border-b text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItemsFromRedux.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border-b">{item.foodMenu.title}</td>
                      <td className="px-4 py-2 border-b">{item.quantity}</td>
                      <td className="px-4 py-2 border-b">
                        ${item.foodMenu.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 border-b text-right">
                        ${(item.quantity * item.foodMenu.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Your cart is empty!</p>
            )}
            <p className='text-xl font-normal text-right mt-4'>Total Price: ${cartItemsFromRedux.totalPrice}</p>
          </div>

          <div>
            <h2 className='text-xl'>3. Select a payment option</h2>
            <div className="flex space-x-4 mb-4"> {/* The buttons stay in a row */}
              <button
                onClick={() => handlePaymentOptionClick('card')}
                type="button"
                className="mt-4 px-4 py-2 rounded-lg w-full sm:w-auto hover:bg-green-500 hover:text-white border border-green-500 flex items-center justify-center space-x-2"
              >
                <FaCreditCard />
                <span>International Credit/Debit Card</span>
              </button>
              <button
                onClick={() => handlePaymentOptionClick('cash')}
                type="button"
                className="mt-4 px-4 py-2 rounded-lg w-full sm:w-auto hover:bg-yellow-500 hover:text-white border border-yellow-500 flex items-center justify-center space-x-2"
              >
                <FaCashRegister />
                <span>Cash on Delivery</span>
              </button>
              <button
                onClick={() => handlePaymentOptionClick('telebirr')}
                type="button"
                className="mt-4 px-4 py-2 rounded-lg w-full sm:w-auto hover:bg-blue-500 hover:text-white border border-blue-500 flex items-center justify-center space-x-2"
              >
                <FaMobileAlt />
                <span>Telebirr/Mobile Payment</span>
              </button>
            </div>

            {/* Display the payment message below the buttons in a column */}
            {paymentMessage && (
              <div className="mt-4">
                <p className="text-lg">{paymentMessage}</p>
                {/* Conditionally render the "Add New Card" button */}
                {showAddCardButton && (
                  <button
                    onClick={handleAddNewCardClick}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Add New Card
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="mt-8 border-t pt-6 w-full">
            <div className="flex flex-col sm:flex-row sm:space-x-8 items-center sm:justify-end text-left">
              {/* Left section for Quick Tips */}
              <div className="sm:w-1/2">
                <h3 className="text-xl font-semibold mb-2">Quick Tips for a Successful Order</h3>
                <ul className="list-disc pl-6 text-sm text-gray-600">
                  <li>Please keep your phone on. We might need to get a hold of you regarding your order (e.g. in the event a restaurant doesn't have an item).</li>
                  <li>Prepare any cash for payment ahead of time. If you're paying with cash, preparing your payment in advance is much appreciated and helps speed up deliveries for everyone.</li>
                </ul>
              </div>

              {/* Right section for Delivery Time and Contact */}
              <div className="sm:w-1/2">
                <h3 className="text-xl font-semibold mt-4 mb-2">Delivery Time</h3>
                <p className="text-sm text-gray-600">
                  We aim to get your order delivered within the hour; however, when ordering during peak meal times, there may be delays.
                </p>

                <h3 className="text-xl font-semibold mt-4 mb-2">Need to Reach Us?</h3>
                <div className="flex items-center text-sm text-gray-600 justify-start">
                  <FaEnvelope className="mr-2 text-blue-600" />
                  <p>
                    Send us an email at <a href="mailto:help@deliveraddis.com" className="text-blue-600">help@deliveraddis.com</a>
                  </p>
                </div>
                <div className="flex items-center mt-2 text-sm text-gray-600 justify-start">
                  <FaPhoneAlt className="mr-2 text-blue-600" />
                  <p>
                    SMS at <a href="tel:+251966935941" className="text-blue-600">+251-966-935-941</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conditionally render the popups */}
      {showLocationPopup && (
        <AddNewLocation onClose={toggleLocationPopup} onSave={handleLocationSave} />
      )}

      {showCardPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Card Details</h2>
            <CreditCardPaymentForm
              paymentDetails={paymentDetails}
              handlePaymentChange={handlePaymentChange}
            />
            <button
              onClick={toggleCardPopup}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckOut;
