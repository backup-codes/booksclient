import {createSlice} from '@reduxjs/toolkit';

const RestaurantAdmin = createSlice({
    name:"restaurant",
    initialState: {
        restaurantToken : null,
        role : null,
    },
    reducers: {
        restaurantDetails(state , action){
            const newData = action.payload
            state.restaurantToken = newData.token;
            state.role = newData.role;
        },
        restaurantLogout(state){
            state.restaurantToken = null
            state.role = null
        }
    }
})

export const {restaurantDetails, restaurantLogout} = RestaurantAdmin.actions;
export default RestaurantAdmin.reducer;