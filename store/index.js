import { configureStore } from "@reduxjs/toolkit";


import AccountReducer from './Account/Slice'
import MaterialReducer from "./Material/Slice";

export const store = configureStore({
    reducer: {
        Account: AccountReducer,
        Material: MaterialReducer
    }
})