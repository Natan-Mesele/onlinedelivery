import api from "../config/api"; // Your API base configuration
import {
  ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAILURE,
  REMOVE_FROM_CART_REQUEST, REMOVE_FROM_CART_SUCCESS, REMOVE_FROM_CART_FAILURE,
  GET_CART_REQUEST, GET_CART_SUCCESS, GET_CART_FAILURE,
  CLEAR_CART_REQUEST, CLEAR_CART_SUCCESS, CLEAR_CART_FAILURE
} from "./ActionType";

export const addToCart = (id) => async (dispatch) => {
  dispatch({ type: ADD_TO_CART_REQUEST });
  try {
    const jwt = localStorage.getItem("jwt");
    const response = await api.post(`/api/cart/add/${id}`, null, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });

    dispatch({ type: ADD_TO_CART_SUCCESS, payload: response.data });
    console.log("Add to Cart Success:", response.data);
  } catch (error) {
    dispatch({
      type: ADD_TO_CART_FAILURE,
      payload: error.response?.data?.message || error.message
    });
    console.error("Add to Cart Error:", error);
  }
};

// Remove item from cart
export const removeFromCart = (userId, cartItemId) => async (dispatch) => {
  dispatch({ type: REMOVE_FROM_CART_REQUEST });
  try {
    const response = await api.delete(`/cart/${userId}/remove/${cartItemId}`);
    dispatch({ type: REMOVE_FROM_CART_SUCCESS, payload: cartItemId });
    console.log("Remove from Cart Success:", response.data);
  } catch (error) {
    dispatch({
      type: REMOVE_FROM_CART_FAILURE,
      payload: error.response?.data?.message || error.message
    });
    console.error("Remove from Cart Error:", error);
  }
};

export const getCart = () => async (dispatch) => {
  dispatch({ type: GET_CART_REQUEST });
  try {
    const response = await api.get(`/api/cart`, null);
    if (response.data.jwt) {
      localStorage.setItem("jwt", response.data.jwt);
    }
    dispatch({ type: GET_CART_SUCCESS, payload: response.data });
    console.log("Get Cart Success:", response.data);
  } catch (error) {
    dispatch({
      type: GET_CART_FAILURE,
      payload: error.response?.data?.message || error.message
    });
    console.error("Get Cart Error:", error);
  }
};

export const clearCart = (userId) => async (dispatch) => {
  dispatch({ type: CLEAR_CART_REQUEST });
  try {
    await api.delete(`/cart/${userId}/clear`);
    dispatch({ type: CLEAR_CART_SUCCESS });
    console.log("Clear Cart Success");
  } catch (error) {
    dispatch({
      type: CLEAR_CART_FAILURE,
      payload: error.response?.data?.message || error.message
    });
    console.error("Clear Cart Error:", error);
  }
};
