import { configureStore } from "@reduxjs/toolkit";
import currentUser from "./userLogin";

export const store = configureStore({
    reducer: {
      currentUser: currentUser
    },
  })

