import axios from "axios";
import { GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./ActionType";
import { API_BASE_URL } from "../config/api";

export const register = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    dispatch({ type: REGISTER_SUCCESS, payload: data });
    console.log("register success", data);
  } catch (error) {
    console.log(error);
  }
};

export const login = (formData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/login`, formData);
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("restaurantId", data.id);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          jwt: data.jwt,
          userId: data.id,
          restaurantId: data.id,
        },
      });
    }
    console.log("Login success", data);
  } catch (error) {
    console.log("Login error:", error);
  }
};

export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    dispatch({ type: GET_USER_SUCCESS, payload: data });
    console.log("user success", data);
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = (userData) => async (dispatch) => {
  const userId = localStorage.getItem("userId");  // Get userId from localStorage
  if (!userId) {
    console.error("User ID is missing or undefined");
    return;
  }

  dispatch({ type: UPDATE_PROFILE_REQUEST });

  try {
    const { data } = await axios.put(`${API_BASE_URL}/api/users/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
    console.log("Profile updated successfully", data);
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error.message });
    console.log("Profile update failed", error);
  }
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    dispatch({ type: LOGOUT });
  };
};
