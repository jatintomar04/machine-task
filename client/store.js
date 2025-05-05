import { configureStore } from "@reduxjs/toolkit"; 
import auth from "./vite-project/src/Features/auth/authslice";
import profile from "./vite-project/src/Features/userprofile/profileslice"



 export const store = configureStore({
  reducer : {auth, profile}
})