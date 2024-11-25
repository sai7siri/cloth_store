
import React, { useEffect, useState } from "react";
import Form from "./Form";
import ModelPop from "./Model";
import { useProductContext } from "../context/product";
import { useSelector , useDispatch } from "react-redux";
import Loading from '../utils/Loading'
import { fetchData } from "../context/productsSlice";

const AllProducts = () => {

const { openModel } = useProductContext();
const dispatch = useDispatch();

const { client , loading , error} = useSelector( state => state.product);



  useEffect( ()=>{
   dispatch(fetchData() );
  } , [dispatch] )


  return (
   <>
   {
    loading ? <Loading bar ={ 'bar' } /> : <Form  data = {client} />
   }
   
   <div className={openModel ? "block" : "hidden"} >
   <ModelPop />
   </div>
   </>
  );
};

export default AllProducts;
