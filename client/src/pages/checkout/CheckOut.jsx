import React, { useEffect, useState } from "react";
import Address from "../address/Address";
import CheckoutCart from "./CheckoutCart";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrder } from "../../context/orderSlice";

const CheckOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paymentStart, setPaymentStart] = useState(false);
  const [selectedAddres, setSelectedAddres] = useState(null);
  const { cartItems, cartId } = useSelector((state) => state.cart);
  const { approval_url, loading } = useSelector((state) => state.orders);

  // useEffect(() => {
  //   if (cartItems.length === 0) {
  //     navigate("/");
  //   }
  // }, [navigate, cartItems]);

  const subTotal = cartItems.reduce((sub, item) => {
    return sub + item?.price * item.quantity;
  }, 0);

  const handleCreateOrder = () => {
    if (selectedAddres === null) {
      return toast.error("select a shipping address");
    } else if (cartItems.length === 0) {
      return toast.error("your cart is empty ? plz add something");
    }

    const proceed = window.confirm(
      "Are you sure you want to proceed with PayPal payment?"
    );
    if (!proceed) return;
    const orderData = {
      cartData: cartItems.map((item) => ({
        productId: item?.productId,
        title: item?.name,
        image: item?.image[0],
        price: item?.price,
        quantity: item?.quantity,
      })),
      address: {
        name: selectedAddres?.name,
        city: selectedAddres?.city,
        state: selectedAddres?.state,
        street: selectedAddres?.street,
        postalCode: selectedAddres?.postalCode,
        phone: selectedAddres?.phone,
      },
      cartId: cartId,
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: subTotal,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    dispatch(createOrder(orderData)).then((data) => {
      if (data.payload.success) {
        setPaymentStart(true);
      } else {
        setPaymentStart(false);
      }
    });
  };

  console.log(paymentStart);
  if (approval_url) {
    window.location.href = approval_url;
  }

  return (
    <div className="mb-10">
      {cartItems ? (
        <div className="overflow-auto">
          <div>
            <img
              src={
                "https://static.vecteezy.com/system/resources/thumbnails/002/006/967/small/young-women-takes-a-shopping-cart-and-enjoy-online-shopping-through-smartphones-choose-to-buy-gifts-valentine-s-day-concepts-website-or-mobile-phone-application-flat-design-illustration-vector.jpg"
              }
              alt=""
              className="w-full h-[45vh] object-fit rounded-md"
            />
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-4">
            <div className="border border-lime-900 flex-1 px-4 w-full max-h-[500px] overflow-auto">
              <h1 className="font-mono  text-teal-700 text-xl text-center">
                User Address
              </h1>
              <Address
                setSelectedAddres={setSelectedAddres}
                selectedAddres={selectedAddres}
              />
            </div>

            <div className="border bg-zinc-50">
              <CheckoutCart cartItems={cartItems} />
              <div className="mt-4 flex flex-col items-center  px-4">
                <div className="font-mono text-xl text-white p-4 bg-emerald-700 rounded-lg w-full text-center">
                  TotalAmount : $ {subTotal}
                </div>
                <button
                  onClick={handleCreateOrder}
                  className="font-serif text-xl text-white bg-black text-center w-full mt-3 p-4 rounded-xl"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    "CheckOut-with-Paypal"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CheckOut;
