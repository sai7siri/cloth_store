import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BaseUrl from "../utils/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";

const fetchCart = createAsyncThunk("fetchCart", async () => {
  try {
    const { data } = await axios.get(`${BaseUrl}/api/user/getcart`, {
      withCredentials: true,
    });
    return {
      cartId: data?.data?.cartId,
      cartData: data?.data?.cartData,
    };
  } catch (err) {
    throw err;
  }
});

const deleteCart = createAsyncThunk(
  "delete/cart",
  async ({ id, size }, { dispatch }) => {
    try {
      await axios.delete(`${BaseUrl}/api/user/delete/${id}`, {
        data: { size },
        withCredentials: true,
      });
      return { id, size };
    } catch (err) {
      throw err;
    }
  }
);

const updateCart = createAsyncThunk(
   "update/cart",
   async ({ productId, size , quantity }) => {

     try {
      const {data} =  await axios.put(`${BaseUrl}/api/user/updatecart`,
         {productId, size , quantity},
         {withCredentials : true}
       );

      return {productId, size , quantity};
   
     } catch (err) {
       throw err;
     }
   }
 );



const cartSlice = createSlice({
  name: "cart",

  initialState: {
    cartId: null,
    cartItems: [],
    loading: false,
    error: null,
  },

  reducers : {
    clearCart : (state)=>{
      state.cartId = null;
      state.cartItems = [];
      state.loading = false;
      state.error = null
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartId = action.payload.cartId;
        state.cartItems = action.payload.cartData;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.cartId = null;
        state.cartData = [];
      });

    builder
      .addCase(deleteCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
         const { id, size } = action.payload;
        state.loading = false;
        state.cartItems = state.cartItems.filter(
          (item) => !(item.productId === id && item.size === size)
        );
        state.error = null;
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.cartId = null;
        state.cartData = [];
      });

    builder
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false
       const {productId, size , quantity} = action.payload;
        const cartUpdate = state.cartItems.find( item=>(
         item.productId === productId && item.size === size
        ));

        if(cartUpdate){
         cartUpdate.quantity = quantity
        }
         // console.log(updatedCart);
        state.error = null;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
       
      });
  },
});
export const {clearCart} = cartSlice.actions;
export { fetchCart, deleteCart , updateCart };
export default cartSlice.reducer;
