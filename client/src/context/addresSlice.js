
import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../utils/baseUrl";


const fetchAddress = createAsyncThunk('fetchAddres' , async()=>{
   try{

      const {data} = await axios.get(`${baseUrl}/api/user/getaddress` , 
         {withCredentials : true}
      )
      return data?.data;
   }catch(err){
      throw err;
   }
});

const addAddress = createAsyncThunk('addAddres' , async( form )=>{
   try{
      const {data} = await axios.post(`${baseUrl}/api/user/address` , 
         form,
         {withCredentials : true}
      );
         return data;
   }catch(err){
      throw err;
   }
});

const editAddress = createAsyncThunk('editAddres' , async( {form  , id })=>{

   try{
      const {data} = await axios.put(`${baseUrl}/api/user/editaddress/${id}` , 
         form,
         {withCredentials : true}
      );
         return data?.data;
   }catch(err){
      throw err;
   }
});


const deleteAddress = createAsyncThunk('deleteAddres' , async(addressId)=>{
   try{

      const {data} = await axios.delete(`${baseUrl}/api/user/deleteaddress` , 
       {
         data : {addressId},
         withCredentials : true
       }
      );
         return data?.data;
   }catch(err){
      throw err;
   }
});



const addressSlice = createSlice({

   name : 'address',

   initialState : {
      addressData : [],
      loading : false,
   },

   extraReducers : (builder)=>{
      builder.addCase(fetchAddress.pending , (state)=>{
         state.loading = true;
      })
      .addCase(fetchAddress.fulfilled , (state , action)=>{
         state.loading = false;
         state.addressData = action.payload;
      })
      .addCase(fetchAddress.rejected , (state)=>{
         state.loading = false;
         state.addressData = [];
      })
      builder.addCase(addAddress.pending , (state)=>{
         state.loading = true;
      })
      .addCase(addAddress.fulfilled , (state , action)=>{
         state.loading = false;
         state.addressData = action.payload;
      })
      .addCase(addAddress.rejected , (state)=>{
         state.loading = false;
         state.addressData = [];
      })
      builder.addCase(deleteAddress.pending , (state)=>{
         state.loading = true;
      })
      .addCase(deleteAddress.fulfilled , (state , action)=>{
         state.loading = false;
         state.addressData = state.addressData.filter( item=> item._id !== action.payload._id );
      })
      .addCase(deleteAddress.rejected , (state)=>{
         state.loading = false;
         state.addressData = [];
      })
      builder.addCase(editAddress.pending , (state)=>{
         state.loading = true;
      })
      .addCase(editAddress.fulfilled , (state , action)=>{
         state.loading = false;
         state.addressData = state.addressData.map( item=> item._id === action.payload._id ? action.payload : item);
      })
      .addCase(editAddress.rejected , (state)=>{
         state.loading = false;
      })
   }

});

export {fetchAddress , addAddress , deleteAddress , editAddress}

export default addressSlice.reducer;