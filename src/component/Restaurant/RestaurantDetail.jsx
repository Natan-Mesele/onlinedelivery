// components/RestaurantDetail.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart } from 'react-icons/fa';
import { fetchRestaurantById, getAllRestaurants } from '../../Redux/Restaurant/Action';
import { getAllFoodTypes, getFoodMenusByFoodType } from '../../Redux/Food/Action';
import { addToCart, getCart } from '../../Redux/Cart/Action';

const RestaurantDetail = () => {
  const { id } = useParams();
  console.log('Restaurant ID:', id);

  const [activeFoodType, setActiveFoodType] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState({});

  const dispatch = useDispatch();
  const restaurantDetails = useSelector((state) => state.restaurant.restaurantDetail);
  const cartItemsFromRedux = useSelector((state) => state.cart.cartItems);
  const foodTypes = useSelector((state) => state.food.foodTypes);
  const foodMenus = useSelector((state) => state.food.foodMenus);
  const user = useSelector((state) => state.auth.user);
  const isRestaurantOpen = restaurantDetails?.open;
  const isUserLoggedIn = user !== null;
  console.log('Is user logged in?', isUserLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchRestaurantById(id));
      dispatch(getAllFoodTypes(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getAllRestaurants());
    dispatch(getCart());
  }, [dispatch]);

  const handleFoodTypeClick = (id, foodTypeName) => {
    setActiveFoodType(foodTypeName);
    dispatch(getFoodMenusByFoodType(id));
  };

  const handleAddToCart = (food) => {
    if (!isUserLoggedIn) {
      alert("You must log in to add items to the cart.");
      return;
    }

    if (!isRestaurantOpen) {
      alert("This restaurant is currently closed.");
      return;
    }

    console.log("Adding to cart: Food Menu ID:", food.id);

    dispatch(addToCart(food.id));
  };

  const calculateTotal = () => {
    return cartItemsFromRedux.reduce((total, item) => total + item.price, 0);
  };

  const renderStars = (rating) => {
    let stars = [];
    const starRating = parseFloat(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-yellow-500 ${i <= starRating ? 'filled' : 'empty'}`}>★</span>
      );
    }
    return stars;
  };

  const handleIngredientChange = (foodTitle, ingredient) => {
    const updatedSelectedIngredients = { ...selectedIngredients };

    if (updatedSelectedIngredients[foodTitle]) {
      const index = updatedSelectedIngredients[foodTitle].indexOf(ingredient);
      if (index > -1) {
        updatedSelectedIngredients[foodTitle].splice(index, 1);
      } else {
        updatedSelectedIngredients[foodTitle].push(ingredient);
      }
    } else {
      updatedSelectedIngredients[foodTitle] = [ingredient];
    }

    setSelectedIngredients(updatedSelectedIngredients);
  };

  const handleCheckout = () => {
    if (!isUserLoggedIn) {
      alert('Please log in to proceed with the checkout.');
      return;
    }
    navigate('/check');
  };

  return (
    <div className="font-sans">
      {restaurantDetails ? (
        <>
          <div className="relative w-full h-[250px] bg-cover bg-center" style={{ backgroundImage: `url(${restaurantDetails.images})` }}>
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            <div className="relative z-10 flex items-center justify-center h-full text-white px-6">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-200">{restaurantDetails.name}</h1>
              </div>
            </div>
          </div>

          <div className="mt-8 max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800">Details</h2>
            <div className="mt-6 text-lg text-gray-600">
              <p className="text-lg mt-4">{restaurantDetails.description}</p>
              <p><strong>Rating:</strong> {renderStars(restaurantDetails.rating)} {restaurantDetails.rating} Rating</p>
              <p><strong>Status:</strong> {isRestaurantOpen ? "Open Now" : "Closed"}</p>
              <p><strong>Delivery Day:</strong> {restaurantDetails.deliveryDay}</p>
            </div>
          </div>
          <div className="mt-10 flex space-x-8 max-w-7xl mx-auto">
            {/* Food Types */}
            <div className="flex flex-col w-1/5 bg-gray-50 p-6 rounded-lg h-[450px]">
              <h3 className="text-xl font-semibold text-gray-800 mb-8">Food Types</h3>
              {foodTypes && foodTypes.map((foodType) => (
                <button
                  key={foodType.id}
                  className={`text-left px-6 py-3 rounded-lg mb-6 ${activeFoodType === foodType.name ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => handleFoodTypeClick(foodType.id, foodType.name)}
                >
                  {foodType.name} Dishes
                </button>
              ))}
            </div>

            {/* Food Menu */}
            <div className="flex-grow bg-white p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-semibold text-gray-800 mb-6">Food Menu</h4>
              <div className="flex flex-col space-y-6">
                {foodMenus && foodMenus.length > 0 ? (
                  foodMenus.map((food, index) => (
                    <div key={index} className="py-4 border-b">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-800">{food.title}</span>
                        <span className="text-lg font-semibold text-gray-800">{food.price} ETB</span>
                      </div>
                      <div className="flex flex-col items-start">
                        <p className="text-base text-gray-600 mt-2">{food.description}</p>
                        <div className="text-sm text-gray-500 mt-2">
                          <p><strong>Ingredients:</strong></p>
                          <div className="flex flex-wrap space-x-4">
                            {food.ingredients.map((ingredient, index) => (
                              <div key={index} className="flex items-center">
                                <input
                                  type="checkbox"
                                  id={`${food.title}-${ingredient}`}
                                  onChange={() => handleIngredientChange(food.title, ingredient)}
                                  className="mr-2"
                                />
                                <label htmlFor={`${food.title}-${ingredient}`}>{ingredient}</label>
                              </div>
                            ))}
                          </div>
                        </div>
                        <button
                          className="mt-4 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full"
                          onClick={() => handleAddToCart(food)}
                        >
                          <FaShoppingCart />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No dishes available for this food type.</p>
                )}
              </div>
            </div>

            {/* Checkout Section */}
            <div className="w-1/4 bg-gray-50 p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-semibold text-gray-800 mb-6">Checkout</h4>
              {cartItemsFromRedux?.items && cartItemsFromRedux.items.length > 0 ? (
                <>
                  <ul className="space-y-4">
                    {cartItemsFromRedux.items.map((item, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <div>
                          <p className="text-lg font-semibold text-gray-800">
                            {item.foodMenu?.title}
                          </p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="text-lg text-gray-800">{item.totalPrice} ETB</p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-800 ">Total:  </p>
                    <span className="text-green-500">{cartItemsFromRedux.totalPrice} ETB</span>
                  </div>
                  <button
                    className={`mt-4 w-full p-3 rounded-lg ${cartItemsFromRedux.items.length > 0
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    onClick={handleCheckout}
                    disabled={cartItemsFromRedux.items.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </>
              ) : (
                <p>Your cart is empty.</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <p>Loading restaurant details...</p>
      )}
    </div>
  );
};

export default RestaurantDetail;
