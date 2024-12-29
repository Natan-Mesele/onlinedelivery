import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import {thunk} from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage
import { authReducer } from "./Auth/Reducer";
import { restaurantReducer } from "./Restaurant/Reducer";
import foodReducer from "./Food/Reducer";
import cartReducer from "./Cart/Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  restaurant: restaurantReducer,
  food: foodReducer,
  cart: cartReducer
});

// Configuring persistence
const persistConfig = {
  key: "root", // Key to persist the entire state
  storage,     // Specifies the storage method (localStorage)
  whitelist: ["auth"], // Specify reducers to persist (e.g., auth)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted reducer
export const store = legacy_createStore(persistedReducer, applyMiddleware(thunk));

// Create a persistor
export const persistor = persistStore(store);