import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { useProductContext } from "../../context/product";
import { useDispatch } from "react-redux";
import { clearCart } from "../../context/cartSlice";

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
    <div className="flex flex-col items-center justify-center h-full gap-12">
      {accUser.role === "admin" ? (
        <>
          <Link to="/dashboard/allorders"
          onClick={()=> setActiveLinks('/dashboard/allorders')}
          >
            <div className={`lg:px-16 px-2 py-2 rounded-lg font-serif  ${ activeLinks === '/dashboard/allorders' ? 'bg-sky-600 text-white' : 'hover:bg-sky-600 hover:text-white' }`}>
              AllOrders
            </div>
          </Link>

          <Link to="/dashboard/allproducts"
          onClick={()=> setActiveLinks('/dashboard/products')}
          >
            <div className={`lg:px-16  px-2 py-2 rounded-lg font-serif ${ activeLinks === '/dashboard/allproducts' ? 'bg-sky-600 text-white' : 'hover:bg-sky-600 hover:text-white' }`}>
              AllProducts
            </div>
          </Link>
        </>
      ) : (
        <>
          <Link to="/dashboard/profile"
          onClick={()=> setActiveLinks('/dashboard/profile')}
          >
            <div className={`lg:px-16 px-2 py-2 rounded-lg font-serif ${activeLinks === '/dashboard/profile' ? "bg-sky-600 text-white" : "hover:bg-sky-600 hover:text-white"}`}>
              Profile
            </div>
          </Link>

          <Link to="/dashboard/order"
          onClick={()=> setActiveLinks('/dashboard/order')}
          >
            <div className={` lg:px-16  px-2 py-2 rounded-lg font-serif ${activeLinks === '/dashboard/order' ? "bg-sky-600 text-white" : "hover:bg-sky-600 hover:text-white"} `}>
              Orders
            </div>
          </Link>

          {/* <Link to="/dashboard/setting"
          onClick={()=> setActiveLinks('/dashboard/setting')}
          >
            <div className={` lg:px-16  px-2 py-2 rounded-lg font-serif ${activeLinks === '/dashboard/setting' ? "bg-sky-600 text-white" : "hover:bg-sky-600 hover:text-white"} `}>
              Address
            </div>
          </Link> */}
        </>
      )}

      <div
        onClick={handleLogout}
        className="lg:px-16  px-2 py-2 rounded-lg hover:bg-red-600 hover:text-white cursor-pointer"
      >
        Logout
      </div>
    </div>
  );
};

export default Links;
