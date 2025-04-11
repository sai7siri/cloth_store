import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { useProductContext } from "../../context/product";
import { useDispatch } from "react-redux";
import { clearCart } from "../../context/cartSlice";
import { ImProfile } from "react-icons/im";
import { MdOutlineLocalGroceryStore , MdListAlt } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { FaBoxOpen } from "react-icons/fa";

const Links = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [activeLinks , setActiveLinks ] = useState('');
  const { setAccUser, accUser } = useProductContext();

  

  useEffect( ()=>{

    if(location.pathname === '/dashboard'){
      setActiveLinks(accUser.role === "admin" ? '/dashboard/allorders' : '/dashboard/profile');
      navigate(accUser.role === 'admin' ? '/dashboard/allorders' : '/dashboard/profile')
    }else{
      setActiveLinks(location.pathname);
    }

  } , [accUser , location.pathname , navigate]);

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/user/logout`, {
        withCredentials: true,
      });

      if (data.success) {
        setAccUser(null);
        localStorage.removeItem("user");
        dispatch(clearCart());
        navigate("/signin");
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("something went wrong");
      }
    }
  };


  return (
 
    <div className="flex flex-row sm:flex-col items-center justify-evenly sm:justify-center h-full sm:gap-12 py-3 bg-[#5F99AE]">
      {accUser.role === "admin" ? (
        <>
          <Link to="/dashboard/allorders"
          onClick={()=> setActiveLinks('/dashboard/allorders')}
          >
            <div className={`lg:px-16 px-2 py-2 rounded-lg font-serif text-white ${ activeLinks === '/dashboard/allorders' ? 'bg-black ' : 'hover:bg-sky-600 ' }`}>
            <span className="hidden sm:block">
            AllOrders
              </span>
              <MdListAlt size={"26"} className="sm:hidden"/>
              
            </div>
          </Link>

          <Link to="/dashboard/allproducts"
          onClick={()=> setActiveLinks('/dashboard/products')}
          >
            <div className={`lg:px-16  px-2 py-2 rounded-lg font-serif text-white ${ activeLinks === '/dashboard/allproducts' ? 'bg-black' : 'hover:bg-black ' }`}>
            <span className="hidden sm:block">
            AllProducts
              </span>
              <FaBoxOpen size={"26"} className="sm:hidden"/>
             
            </div>
          </Link>
        </>
      ) : (
        <>
          <Link to="/dashboard/profile"
          onClick={()=> setActiveLinks('/dashboard/profile')}
          >
            <div className={`lg:px-16 px-2 py-2 rounded-lg font-serif text-white ${activeLinks === '/dashboard/profile' ? "bg-black" : "hover:bg-black"}`}>
             <span className="hidden sm:block">
             Profile
              </span>
              <ImProfile size={"24"} className="sm:hidden"/>
            </div>
          </Link>

          <Link to="/dashboard/order"
          onClick={()=> setActiveLinks('/dashboard/order')}
          >
            <div className={` lg:px-16  px-2 py-2 rounded-lg font-serif text-white ${activeLinks === '/dashboard/order' ? "bg-black" : "hover:bg-black"} `}>
             
             <span className="hidden sm:block">Orders</span>
             <MdOutlineLocalGroceryStore size={"26"} className="sm:hidden"/>
            </div>
          </Link>

        </>
      )}

      <div
        onClick={handleLogout}
        className="lg:px-16  px-2 py-2 rounded-lg hover:bg-red-700 text-white cursor-pointer"
      >
        <span className="hidden sm:block">Logout</span>
        <HiOutlineLogout size={"26"} className="sm:hidden"/>
      </div>
    </div>
     
  );
};

export default Links;
