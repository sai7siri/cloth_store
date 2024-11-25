import { createContext, useContext, useEffect, useState } from "react";
import { client } from "../assets/frontend_assets/assets";
import axios from "axios";
import startpoint from "../utils/baseUrl";
import { toast } from "react-toastify";

export const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

const ProductContextProvider = ({ children }) => {

  // user details
  const [accUser , setAccUser] = useState( ()=>{
    const storedUser = localStorage.getItem('user');

    return storedUser ? JSON.parse(storedUser) : null ;

  });
  
  
  const [search, setSearch] = useState("");
  const [showBar, setShowBar] = useState(false);
  const [locationIcon, setLocationIcon] = useState(false);
  const [openCart , setOpenCart] = useState(false);
  const [openModel , setOpenModel] = useState(false);
  
  // edit product data
  const [ editProduct , setEditProduct ] = useState(null);

  const value = {
    client,
    search,
    setSearch,
    showBar,
    setShowBar,
    locationIcon,
    setLocationIcon,
    openCart,
    setOpenCart,
    setAccUser,
    accUser,
    openModel,
    setOpenModel,
    setEditProduct,
    editProduct
  };



  return (
    <ProductContext.Provider value={value}> {children} </ProductContext.Provider>
  );
};

export default ProductContextProvider;
