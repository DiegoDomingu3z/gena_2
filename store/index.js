import { configureStore } from "@reduxjs/toolkit";


import AccountReducer from './Account/Slice'

export const store = configureStore({
    reducer: {
        Account: AccountReducer
    }
})