import React, { useEffect, useState } from "react";
import { LiaStoreAltSolid } from "react-icons/lia";
import { Link, NavLink } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosArrowBack } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { useProductContext } from "../context/product";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";

const NavBar = () => {
  const { setShowBar, showBar, setOpenCart, accUser } =
    useProductContext();

  const { cartItems } = useSelector((state) => state.cart);


  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 60) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }, []);

  return (
    <div
      className={`py-5 sticky top-0 w-full z-20 bg-white ${
        active && "shadow-xl"
      }`}
    >
      <div className="container flex items-center justify-between">
          <Link to="/">
        <div className="flex items-center gap-4 px-3">
          <LiaStoreAltSolid size={"28"} color="skyblue" />
          <p className="hidden md:block font-bold text-lg font-serif">My Store</p>
        </div>
          </Link>

        <div className="hidden lg:flex items-center gap-4 ">
          <NavLink to="/" className="flex flex-col items-center">
            <p className="font-mono font-medium">Home</p>
            <hr className="w-2/4 h-[2px] bg-black hidden" />
          </NavLink>
          <NavLink to="/collections" className="flex flex-col items-center">
            <p>Collections</p>
            <hr className="w-2/4 h-[2px] bg-black hidden" />
          </NavLink>
          <NavLink to="/about" className="flex flex-col items-center">
            <p>About</p>
            <hr className="w-2/4 h-[2px] bg-black hidden" />
          </NavLink>
          <NavLink to="/contact" className="flex flex-col items-center">
            <p>Contact</p>
            <hr className="w-2/4 h-[2px] bg-black hidden" />
          </NavLink>
        </div>

        <div className="flex items-center gap-6 max-w-md w-full">
            {/* <Link to={'/collections'}>
            <div onClick={() => setShowBar(!showBar)}>
              <CiSearch size={"22"} className="cursor-pointer" />
            </div>
            </Link> */}

            <SearchBar />
          

          {
            accUser && accUser.role === "admin" ? null : (

          <div className="relative cursor-pointer">
            <IoCartOutline size={"26"} onClick={() => setOpenCart(true)} />
              {
                accUser && cartItems && cartItems.length > 0  && (
                  <div className="absolute bottom-[-2px] right-[-10px] bg-black text-white w-5 h-5 flex items-center justify-center rounded-full text-sm ">
              <p>{cartItems?.length}</p>
            </div>
                )
              }
            
          </div>
            )
          }


          <div>
            <Link to={accUser ? "/dashboard" : "/signin"}>
              {accUser ? (
                <img
                  src={accUser?.profile}
                  alt="profile"
                  className="h-12 w-12 object-cover rounded-full"
                />
              ) : (
                <CgProfile size={"26"} />
              )}
            </Link>
          </div>

          <div className="lg:hidden relative cursor-pointer">
            <RxHamburgerMenu onClick={() => setVisible(true)} size={"26"} />
          </div>
        </div>

        {/* mobile view side bar border-b w-full */}

        <div
          className={`fixed top-0 bottom-0 bg-white w-full z-50 transition-all ease-in-out duration-300 ${
            visible ? "block" : "hidden"
          }`}
        >
          <div
            className="relative top-2 left-2 flex items-center gap-1 cursor-pointer"
            onClick={() => setVisible(false)}
          >
            <IoIosArrowBack size={"24"} />
            <span className="text-whi">back</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 py-8 text-center">
            <NavLink
              to="/"
              className="cursor-pointer border-b w-full"
              onClick={() => setVisible(false)}
            >
              Home
            </NavLink>

            <NavLink
              to="/collections"
              className="cursor-pointer border-b w-full"
              onClick={() => setVisible(false)}
            >
              Collections
            </NavLink>

            <NavLink
              to="/about"
              className="cursor-pointer border-b w-full"
              onClick={() => setVisible(false)}
            >
              About
            </NavLink>

            <NavLink
              to="/contact"
              className="cursor-pointer border-b w-full"
              onClick={() => setVisible(false)}
            >
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
