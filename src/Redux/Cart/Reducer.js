import { ADD_TO_CART_FAILURE, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, CLEAR_CART_FAILURE, CLEAR_CART_REQUEST, CLEAR_CART_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_FROM_CART_FAILURE, REMOVE_FROM_CART_REQUEST, REMOVE_FROM_CART_SUCCESS } from "./ActionType";

const initialState = {
  cartItems: [], // Holds items in the cart
  loading: false, // Represents the loading state for cart operations
  error: null, // Holds error messages, if any
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    // Add to Cart
    case ADD_TO_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };

      case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.payload,
      };

    case ADD_TO_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Remove from Cart
    case REMOVE_FROM_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_FROM_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: state.cartItems.filter(
          (item) => item.cartItemId !== action.payload // Match by cartItemId
        ),
      };
    case REMOVE_FROM_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };


    // Get Cart
    case GET_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: action.payload, // Replace cartItems with fetched data
      };
    case GET_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Clear Cart
    case CLEAR_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: [], // Clear the cart
      };
    case CLEAR_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Default case
    default:
      return state;
  }
};

export default cartReducer;
