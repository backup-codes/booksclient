import {createSlice} from '@reduxjs/toolkit';

const Owner = createSlice({
    name:"owner",
    initialState: {
        ownerToken : null,
        role : null,
    },
    reducers: {
        ownerDetails(state , action){
            const newData = action.payload
            state.ownerToken = newData.token;
            state.role = newData.role;
        },
        ownerLogout(state){
            state.ownerToken = null
            state.role = null
        }
    }
})

export const {ownerLogout, ownerDetails} = Owner.actions;
export default Owner.reducer;