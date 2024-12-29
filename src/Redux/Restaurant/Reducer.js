import { CREATE_RESTAURANT_FAILURE, CREATE_RESTAURANT_REQUEST, CREATE_RESTAURANT_SUCCESS, DELETE_RESTAURANT_FAILURE, DELETE_RESTAURANT_REQUEST, DELETE_RESTAURANT_SUCCESS, FETCH_RESTAURANT_BY_ID_SUCCESS, GET_ALL_RESTAURANTS_FAILURE, GET_ALL_RESTAURANTS_REQUEST, GET_ALL_RESTAURANTS_SUCCESS, UPDATE_RESTAURANT_FAILURE, UPDATE_RESTAURANT_REQUEST, UPDATE_RESTAURANT_STATUS_SUCCESS, UPDATE_RESTAURANT_SUCCESS } from "./ActionType";

const initialState = {
  restaurants: [],
  restaurantDetail: null,
  loading: false,
  error: null,
};

export const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    // CREATE RESTAURANT
    case CREATE_RESTAURANT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: [...state.restaurants, action.payload],
      };
    case CREATE_RESTAURANT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // UPDATE RESTAURANT
    case UPDATE_RESTAURANT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: state.restaurants.map((restaurant) =>
          restaurant.id === action.payload.id ? action.payload : restaurant
        ),
      };
    case UPDATE_RESTAURANT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // DELETE RESTAURANT
    case DELETE_RESTAURANT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: state.restaurants.filter(
          (restaurant) => restaurant.id !== action.payload
        ),
      };
    case DELETE_RESTAURANT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // GET ALL RESTAURANTS
    case GET_ALL_RESTAURANTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_RESTAURANTS_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurants: action.payload,
      };
    case GET_ALL_RESTAURANTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_RESTAURANT_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        restaurantDetail: action.payload,
      };

      case UPDATE_RESTAURANT_STATUS_SUCCESS:
        return {
          ...state,
          restaurants: state.restaurants.map((restaurant) =>
            restaurant.id === action.payload.id
              ? { ...restaurant, open: action.payload.open } // Use 'open' here, not 'isOpen'
              : restaurant
          ),
        };      

    default:
      return state;
  }
};