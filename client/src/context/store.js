
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './cartSlice'; 
import clientSlice from "./productsSlice"
import addressSlice from "./addresSlice";
import orderSlice from "./orderSlice";

 export const store = configureStore({

   reducer : {
      cart : cartSlice,
      product : clientSlice,
      address : addressSlice,
      orders : orderSlice 
   }
 });