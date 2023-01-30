import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import todoSlice from "./todo-slice";
const store =configureStore({
    reducer:{auth:authSlice.reducer,
    todo:todoSlice.reducer}
    
});

export default store;