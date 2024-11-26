import { createContext, useContext, useState } from "react";

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
