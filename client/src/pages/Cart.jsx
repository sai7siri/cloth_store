import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../context/product";
import { TiArrowBackOutline } from "react-icons/ti";
import { useSelector, useDispatch } from "react-redux";
import CartDetailCard from "./CartDetailsCard";
import { fetchCart } from "../context/cartSlice";
import Loading from "../utils/Loading";
import baseUrl from "../utils/baseUrl";
import axios from "axios";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { setOpenCart, openCart, accUser } = useProductContext();
  const { cartItems, loading, cartId } = useSelector((state) => state.cart);

  const subTotal = cartItems && cartItems.reduce((sub, item) => {
    return sub + item?.price * item.quantity;
  }, 0);

  // console.log(subTotal);


  useEffect(() => {
    if(accUser){
      dispatch(fetchCart());
    }
  }, [dispatch , accUser]);

  const handleClearCart = async () => {
    try {
      await axios.delete(
        `${baseUrl}/api/user/cartdelete`,{
          data : {cartId},
          withCredentials : true
        }
      );
      dispatch(fetchCart());
    } catch (err) {
      toast.error('something went wrong')
    }
  };

  return (
    <div
      className={`${
        openCart ? "right-0" : "-right-full"
      } fixed z-40 top-0 bg-white shadow-md h-full w-full md:w-[40vw] lg:w-[45vw] xl:w-[50vw] transition-all duration-300 overflow-auto`}
    >
      <div className="container">
        <div className="flex items-center justify-between py-2  border-b">
          <p>Cart ( { accUser ? cartItems && cartItems?.length : 0 } )</p>
          <p onClick={() => setOpenCart(false)}>
            <TiArrowBackOutline
              size={"30"}
              color={"maroon"}
              className="hover:scale-125"
            />
          </p>
        </div>

        {!accUser ? (
          <div className="flex justify-center my-10 text-zinc-900 font-serif text-lg">
            Login account to see your Cart ?😒
          </div>
        ) : (
          
              <>
                <div className="my-2 w-full h-[400px] overflow-auto flex flex-col gap-4">
                  {cartItems && cartItems.length > 0 ? (
                    cartItems?.map((data, idx) => {
                      return (
                        <CartDetailCard
                          key={idx}
                          data={data}
                          length={cartItems?.length}
                          index={idx}
                        />
                      );
                    })
                  ) : (
                    <div className="flex justify-center my-10 text-zinc-900 font-serif text-lg">
                      No items in Cart 😒
                    </div>
                  )}
                </div>

                { cartItems &&  cartItems?.length > 0 && (
                  <>
                    <div className="flex items-center justify-between mx-4 mt-5">
                      <div className="bg-blue-500 text-white font-mono rounded-md w-1/3  py-2 text-center">
                        SubTotal : ${subTotal}
                      </div>

                      <button
                        className="w-1/3 bg-red-600 rounded-md text-white py-2"
                        onClick={handleClearCart}
                      >
                        Clear Cart
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        setOpenCart(false);
                        navigate("/checkout");
                      }}
                      className=" bg-black py-3 w-full mt-2 text-white text-center rounded-2xl "
                      disabled={cartItems.length > 0 ? false : true}
                    >
                      CheckOut
                    </button>
                  </>
                )}
              </>
          //   )}
          // </>
        )}
      </div>
    </div>
  );
};

export default Cart;
