import { useEffect, useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {deleteCart, fetchCart , updateCart} from "../context/cartSlice";
import axios from "axios";
import baseUrl from "../utils/baseUrl"
import { toast } from "react-toastify";

const CartDetailCard = ({ data, length, index }) => {
  const dispatch = useDispatch();
  const [ quantity , setQuantity ] = useState(null);



   function updateCartQuanity(){
     dispatch(updateCart({ productId : data?.productId , size:data?.size , quantity }));
  }

 useEffect( ()=>{
    if(quantity !== null){
      updateCartQuanity();
    }
 } , [quantity])

  const handleDelete = async (id , size)=>{
      dispatch(deleteCart({id, size} , {dispatch}))
  }

  return (
    <div
      className={`flex items-center gap-2 pb-2 mx-2 ${
        index === length - 1 ? "" : "border-b border-black"
      }`}
    >
      {/* section 1 */}
      <div className="w-[100px] h-[100px] border rounded-md p-1 flex justify-center">
        <img
          src={data?.image[0]}
          alt="item / URL"
          className="w-[80px] h-[90px] object-cover"
        />
      </div>

      {/* section 2 */}

      <div>
        <p className="text-sm text-gray-700">{data?.name}</p>

        <div className="flex gap-6 items-center">
          <div>
            <p className="font-mono text-red-600 py-1">size : {data?.size}</p>
            <p>Price : ${data?.price}</p>
          </div>

          {/* <div className="flex items-center w-24 h-10 border-2 cursor-pointer">
            <div className="flex flex-1 items-center border-r justify-center h-full hover:bg-red-200 "
            onClick={()=> handleQuantityChange(-1)}
            >
              <FiMinus />
            </div>

            <div className="flex flex-1 border-r  justify-center items-center bg-gray-700 h-full text-white"
            >
              { data?.quantity }
            </div>

            <div className="flex flex-1 justify-center items-center h-full hover:bg-green-200"
            onClick={()=> handleQuantityChange(1)}
            >
            <FiPlus />
              
            </div>

          </div> */}
          <div>
            <select value={data.quantity}
            onChange={(e)=> setQuantity(e.target.value)}
            className="w-20 text-center py-2 border border-gray-600 rounded-md font-mono font-semibold text-lg">
              <option className="" value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <p>totalPrice : $ {data?.price * data.quantity}</p>
        </div>
      </div>

      {/*section 3  */}

      <div className="flex-grow flex items-center justify-end cursor-pointer">
        <p
        onClick={()=> handleDelete(data.productId , data?.size)}
        >
          <AiTwotoneDelete size={"30"} />
        </p>
      </div>
    </div>
  );
};

export default CartDetailCard;
