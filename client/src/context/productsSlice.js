
import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import startPoint from "../utils/baseUrl";


const fetchData = createAsyncThunk('getAllItems' , async()=>{
   try{
      const  {data}  = await axios.get(`${startPoint}/api/admin/getproducts` , {
         withCredentials : true
      });
      return data.data;
   

   }catch(err){
      throw err;
   }
})

const productSlice = createSlice({

   name : 'product',

   initialState : {
      client : [],
      loading : false,
      error : null 
   },

   extraReducers : (builder)=>{
      builder.addCase( fetchData.pending ,(state)=>{
            state.loading = true;
            state.error = null
      } )
      .addCase(fetchData.fulfilled , (state , action)=>{
         state.loading = false;
         state.client = action.payload;
         state.error = null;
      })
      .addCase(fetchData.rejected , (state , action)=>{
         state.loading = false;
         state.error = action.payload
      })
   }
});

export { fetchData };

export default productSlice.reducer;