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
        }, 
        toggleTheme: (state) => {

            state.mode = (state.mode === "light") ? ("dark") : ("light");

            document.querySelector("html").classList.remove("light", "dark");
            document.querySelector("html").classList.add(state.mode);            

            localStorage.removeItem("snapTheme");
            localStorage.setItem("snapTheme", state.mode);

        }
    }

});



export const { login, logout, toggleTheme } = authSlicer.actions;

export default authSlicer.reducer;