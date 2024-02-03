import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    status: false,
    userData: null,
}

const authSlicer = createSlice({

    name: "auth",
    initialState,
    reducers: {

        login: (state, action) => {

            state.status = true;
            state.userData = action.payload;
            
            // Check if "authUserData" is already present in localStorage
            const existingAuth = JSON.parse(localStorage.getItem("authUserData"));

            if (!existingAuth) {

                localStorage.setItem("authUserData", JSON.stringify(state));
            }
            else {
                state.userData = existingAuth.userData;
            } 
        },
        logout: (state) => {

            state.status = false;
            state.userData = null;

            localStorage.removeItem("authUserData");
        }
    }

});

export const { login, logout } = authSlicer.actions;

export default authSlicer.reducer;