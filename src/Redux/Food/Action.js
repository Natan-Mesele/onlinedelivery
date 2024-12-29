import api from "../config/api";
import { CREATE_FOOD_MENU_FAILURE, CREATE_FOOD_MENU_REQUEST, CREATE_FOOD_MENU_SUCCESS, CREATE_FOOD_TYPE_FAILURE, CREATE_FOOD_TYPE_REQUEST, CREATE_FOOD_TYPE_SUCCESS, GET_ALL_FOOD_TYPES_FAILURE, GET_ALL_FOOD_TYPES_REQUEST, GET_ALL_FOOD_TYPES_SUCCESS, GET_FOOD_MENUS_BY_FOOD_TYPE_FAILURE, GET_FOOD_MENUS_BY_FOOD_TYPE_REQUEST, GET_FOOD_MENUS_BY_FOOD_TYPE_SUCCESS } from "./ActionType";

export const createFoodType = (foodType) => async (dispatch) => {
  dispatch({ type: CREATE_FOOD_TYPE_REQUEST });

  try {
    const response = await api.post('/api/admin/createFoodType', foodType);
    dispatch({
      type: CREATE_FOOD_TYPE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_FOOD_TYPE_FAILURE,
      payload: error.message || 'Failed to create food type',
    });
  }
};

export const createFoodMenu = (foodMenu) => async (dispatch) => {
  dispatch({ type: CREATE_FOOD_MENU_REQUEST });

  try {
    const response = await api.post('/api/admin/createFoodMenu', foodMenu);
    dispatch({
      type: CREATE_FOOD_MENU_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_FOOD_MENU_FAILURE,
      payload: error.message || 'Failed to create food menu',
    });
  }
};

export const getAllFoodTypes = (id) => async (dispatch) => {
  dispatch({ type: GET_ALL_FOOD_TYPES_REQUEST });
  try {
    const response = await api.get(`/food-types/restaurant/${id}`);
    dispatch({
      type: GET_ALL_FOOD_TYPES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error fetching food types:', error);
    dispatch({
      type: GET_ALL_FOOD_TYPES_FAILURE,
      payload: error.message || 'Failed to fetch food types',
    });
  }
};

export const getFoodMenusByFoodType = (id) => async (dispatch) => {
  dispatch({ type: GET_FOOD_MENUS_BY_FOOD_TYPE_REQUEST });

  try {
    const response = await api.get(`/food-menus/food-type/${id}`);
    dispatch({
      type: GET_FOOD_MENUS_BY_FOOD_TYPE_SUCCESS,
      payload: response.data,
    });
    console.log("get food menu by food type", response.data);
  } catch (error) {
    dispatch({
      type: GET_FOOD_MENUS_BY_FOOD_TYPE_FAILURE,
      payload: error.message || 'Failed to fetch food menus by food type',
    });
  }
};