import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoTrashBin } from "react-icons/io5";
import { deleteCart } from "../../context/cartSlice";

const CheckoutCart = ({ cartItems }) => {
  // const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleDelete = (data) => {
    dispatch(deleteCart({ id: data.productId, size: data.size }));
  };

  return (
    <div className=" max-h-[500px] overflow-auto">
      {cartItems &&
        cartItems.map((data, idx) => (
          <div
            className="flex items-center justify-between p-4 w-full border-b"
            key={idx}
          >
            <div className="flex gap-2 items-cente ">
              <img
                src={data.image[0]}
                alt="profile"
                className="w-20 h-20 object-cover shadow-md"
              />
              <div className="flex flex-col gap-3">
                <p className="font-medium text-gray-700">
                  {data?.name}
                </p>
                <p className="font-medium">Quantity : {data?.quantity}</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <p className="font-serif">
                {" "}
                Price : $ {data.quantity * data?.price}
              </p>
              <button onClick={() => handleDelete(data)}>
                <IoTrashBin size={"26"} />
              </button>
            </div>
          </div>
        ))}
      {/* <div className="mt-4 flex items-center justify-between px-4">
        <div className="font-mono text-xl text-emerald-600">
          TotalAmount :<span className="text-gray-700">${subTotal}</span>
        </div>
        <div>
          pay
        </div>
      </div> */}
    </div>
  );
};

export default CheckoutCart;
