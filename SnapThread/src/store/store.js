import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slicer/authSlicer";


const store = configureStore({

    reducer: {
        auth: authReducer,
    },
});

export default store;