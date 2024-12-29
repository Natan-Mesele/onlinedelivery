import api, { API_BASE_URL } from "../config/api";
import { CREATE_RESTAURANT_FAILURE, CREATE_RESTAURANT_REQUEST, CREATE_RESTAURANT_SUCCESS, DELETE_RESTAURANT_FAILURE, DELETE_RESTAURANT_REQUEST, DELETE_RESTAURANT_SUCCESS, FETCH_RESTAURANT_BY_ID_FAILURE, FETCH_RESTAURANT_BY_ID_REQUEST, FETCH_RESTAURANT_BY_ID_SUCCESS, GET_ALL_RESTAURANTS_FAILURE, GET_ALL_RESTAURANTS_REQUEST, GET_ALL_RESTAURANTS_SUCCESS, UPDATE_RESTAURANT_FAILURE, UPDATE_RESTAURANT_REQUEST, UPDATE_RESTAURANT_STATUS_FAILURE, UPDATE_RESTAURANT_STATUS_REQUEST, UPDATE_RESTAURANT_STATUS_SUCCESS, UPDATE_RESTAURANT_SUCCESS } from "./ActionType";

export const createRestaurant = (restaurantDTO) => async (dispatch) => {
    dispatch({ type: CREATE_RESTAURANT_REQUEST });
    try {
      const { data } = await api.post(
        `${API_BASE_URL}/api/restaurants`,
        restaurantDTO,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      dispatch({ type: CREATE_RESTAURANT_SUCCESS, payload: data });
      console.log("Create Restaurant Success:", data);
    } catch (error) {
      dispatch({ type: CREATE_RESTAURANT_FAILURE, payload: error.response?.data || error.message });
      console.error("Create Restaurant Error:", error);
    }
  };
  
  // Update a restaurant
  export const updateRestaurant = (id, restaurantDTO) => async (dispatch) => {
    dispatch({ type: UPDATE_RESTAURANT_REQUEST });
    try {
      const { data } = await api.put(
        `${API_BASE_URL}/api/restaurants/${id}`,
        restaurantDTO,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      dispatch({ type: UPDATE_RESTAURANT_SUCCESS, payload: data });
      console.log("Update Restaurant Success:", data);
    } catch (error) {
      dispatch({ type: UPDATE_RESTAURANT_FAILURE, payload: error.response?.data || error.message });
      console.error("Update Restaurant Error:", error);
    }
  };
  
  // Delete a restaurant
  export const deleteRestaurant = (id) => async (dispatch) => {
    dispatch({ type: DELETE_RESTAURANT_REQUEST });
    try {
      await api.delete(`${API_BASE_URL}/api/restaurants/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      dispatch({ type: DELETE_RESTAURANT_SUCCESS, payload: id });
      console.log("Delete Restaurant Success:", id);
    } catch (error) {
      dispatch({ type: DELETE_RESTAURANT_FAILURE, payload: error.response?.data || error.message });
      console.error("Delete Restaurant Error:", error);
    }
  };
  
  export const getAllRestaurants = () => async (dispatch) => {
    dispatch({ type: GET_ALL_RESTAURANTS_REQUEST });
    try {
      const { data } = await api.get("/restaurant");
      dispatch({ type: GET_ALL_RESTAURANTS_SUCCESS, payload: data });
      console.log("Get All Restaurants Success:", data);
    } catch (error) {
      dispatch({
        type: GET_ALL_RESTAURANTS_FAILURE,
        payload: error.response?.data || error.message,
      });
      console.error("Get All Restaurants Error:", error);
    }
  };

  export const fetchRestaurantById = (id) => async (dispatch) => {
    dispatch({ type: FETCH_RESTAURANT_BY_ID_REQUEST });
    
    try {
        const response = await api.get(`/restaurant/${id}`);
        console.log('Fetched Restaurant Data:', response.data);
        dispatch({
            type: FETCH_RESTAURANT_BY_ID_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: FETCH_RESTAURANT_BY_ID_FAILURE,
            payload: error.message,
        });
    }
};

  export const updateRestaurantStatus = ({ id, jwt }) => {
    return async (dispatch) => {
      dispatch({ type: UPDATE_RESTAURANT_STATUS_REQUEST });
      try {
        const { data } = await api.put(
          `/api/admin/${id}/status`,
          {}, // Assuming status update doesn't need a payload body
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        dispatch({ type: UPDATE_RESTAURANT_STATUS_SUCCESS, payload: data });
        console.log("Update restaurant status:", data);
      } catch (error) {
        console.log("Error updating restaurant status:", error);
        dispatch({ type: UPDATE_RESTAURANT_STATUS_FAILURE, payload: error });
      }
    };
  };
  