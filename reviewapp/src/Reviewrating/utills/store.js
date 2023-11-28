import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "@reduxjs/toolkit";
import companySlice from "../features/company/companySlice";
import thunk from "redux-thunk";
import authSlice from "../features/auth/authSlice";
import reviewSlice from "../features/review/reviewSlice";

const store = configureStore(
    {
        reducer: {
            user: authSlice,
            company: companySlice,
            review: reviewSlice,
        },
    },
    applyMiddleware(thunk)
);

export default store;