import { CREATE_FOOD_MENU_FAILURE, CREATE_FOOD_MENU_REQUEST, CREATE_FOOD_MENU_SUCCESS, CREATE_FOOD_TYPE_FAILURE, CREATE_FOOD_TYPE_REQUEST, CREATE_FOOD_TYPE_SUCCESS, GET_ALL_FOOD_TYPES_FAILURE, GET_ALL_FOOD_TYPES_REQUEST, GET_ALL_FOOD_TYPES_SUCCESS, GET_FOOD_MENUS_BY_FOOD_TYPE_FAILURE, GET_FOOD_MENUS_BY_FOOD_TYPE_REQUEST, GET_FOOD_MENUS_BY_FOOD_TYPE_SUCCESS } from "./ActionType";


const initialState = { 
    foodTypes: [],  
    foodMenus: [],  
    loading: false, 
    error: null,    
  };
  

const foodReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_FOOD_TYPE_REQUEST:
      case CREATE_FOOD_MENU_REQUEST:
      case GET_ALL_FOOD_TYPES_REQUEST:
      case GET_FOOD_MENUS_BY_FOOD_TYPE_REQUEST:
        return { ...state, loading: true, error: null };
  
      case CREATE_FOOD_TYPE_SUCCESS:
        return {
          ...state,
          loading: false,
          foodTypes: [...state.foodTypes, action.payload],
        };
  
      case CREATE_FOOD_MENU_SUCCESS:
        return {
          ...state,
          loading: false,
          foodMenus: [...state.foodMenus, action.payload],
        };
  
      case GET_ALL_FOOD_TYPES_SUCCESS:
        return {
          ...state,
          loading: false,
          foodTypes: action.payload,
        };
  
      case GET_FOOD_MENUS_BY_FOOD_TYPE_SUCCESS:
        return {
          ...state,
          loading: false,
          foodMenus: action.payload,
        };
  
      case CREATE_FOOD_TYPE_FAILURE:
      case CREATE_FOOD_MENU_FAILURE:
      case GET_ALL_FOOD_TYPES_FAILURE:
      case GET_FOOD_MENUS_BY_FOOD_TYPE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default foodReducer;