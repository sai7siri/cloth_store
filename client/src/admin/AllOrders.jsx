import axios from "axios";
import React, { useEffect, useState } from "react";
import backendURL from "../utils/baseUrl";
import {toast} from "react-hot-toast"
import { updateUserStatus } from "../context/orderSlice";
import { useDispatch } from "react-redux";
import ModalOpen from "./ModalViewOrder";
import { FaDeleteLeft } from "react-icons/fa6";

const AllOrders = () => {
  const dispatch = useDispatch();

  const [viewModel , setViewModel] = useState(null);
  const [orders , setOrders] = useState([]);

  const handleFetch = async ()=>{
    try{
      const {data} = await axios.get(`${backendURL}/api/admin/allusersorders`, {
        withCredentials : true
      });
      setOrders(data?.data);
    }catch(err){
      return toast.error('something went wrong')
    }
  }

  useEffect( ()=>{
    handleFetch();
  } , []);

  // console.log(orders);


  // const [orders, setOrders] = useState([
  //   { id: 101, user: "John Doe", total: "$120", status: "Pending" },
  //   { id: 102, user: "Jane Smith", total: "$200", status: "Shipped" },
  //   { id: 103, user: "Emily Johnson", total: "$50", status: "Delivered" },
  //   { id: 104, user: "Michael Brown", total: "$300", status: "Processing" },
  // ]);

  const handleStatusChange = (id, newStatus) => {
      const statusOrder = orders.map( item=>(
        item._id === id ? {...item , orderStatus : newStatus} : item
      ));
      setOrders(statusOrder);

      dispatch(updateUserStatus({id , newStatus})).then( (data)=>{
        if(data.payload.success){
          toast.success(data.payload.message);
        }
      })
  };

  const handleViewDetail=(data)=>{
    setViewModel(data);
    document.getElementById('modal').showModal();
  }


  return (
    <div className="container mx-auto px-4 mb-8">
      <h1 className="text-2xl font-bold mb-6">Admin - User Orders</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            { orders && orders.length > 0 && orders.map((order , idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order._id.slice(0,6)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.address.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.totalAmount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                     order.orderStatus === 'confirmed' ? "bg-yellow-600 text-gray-50" : 
                     order.orderStatus === 'processing' ? "bg-yellow-950 text-white" : 
                     order.orderStatus === 'shipped' ? "bg-green-800 text-white" :
                     order.orderStatus === 'delivered' ? 'bg-green-500 text-white' : 
                     order.orderStatus === 'cancelled' ? 'bg-red-600 text-white' : ""
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </td>
                <td className="py-4 whitespace-nowrap text-sm font-medium flex gap-4">
                  <select
                    value={order.orderStatus}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="bg-gray-100 border border-gray-300 px-2 py-1 rounded-lg"
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>+
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  <button
                  className="px-3 py-1 bg-black text-white rounded-full"
                 onClick={()=> handleViewDetail(order) }
                  >viewOrder</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ModalOpen viewDetails={viewModel} />
    </div>
  );
};

export default AllOrders;
