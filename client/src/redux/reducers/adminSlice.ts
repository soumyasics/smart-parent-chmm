import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isAdminLoggedIn: false
}
const adminSlice = createSlice({
    initialState,
    name: "admin",
    reducers: {
        adminLoggedIn: (state) => {
            state.isAdminLoggedIn = true
        },
        adminLoggedOut: (state) => {
            state.isAdminLoggedIn = false
        }
    }
})

export const {adminLoggedIn, adminLoggedOut} = adminSlice.actions;
export default adminSlice.reducer;

