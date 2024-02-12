import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import restaurantAdmin from "./slices/restaurantAdmin";
import owner from "./slices/owner";


const rootReducer = combineReducers({
    restaurantDetails: restaurantAdmin,
    ownerDetails: owner
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
