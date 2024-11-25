import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { BiSolidEdit } from "react-icons/bi";
import { VscDiffAdded } from "react-icons/vsc";
import { useProductContext } from "../context/product";
import { useDispatch , } from "react-redux";
import axios from "axios";
import  backendUrl  from "../utils/baseUrl";
import { toast } from "react-toastify";
import { fetchData } from "../context/productsSlice";

const Form = ({ data,  }) => {
  const { setOpenModel, setEditProduct } = useProductContext();
  const dispatch = useDispatch();

  const handleAddData = () => {
    setEditProduct(null);
    setOpenModel(true);
  };

  const handleEditData = (product)=>{
   setEditProduct(product);
   setOpenModel(true);
  }

  const handleDelete=async(id)=>{
    try{
      const res = await axios.delete(`${backendUrl}/api/admin/delete/${id}` , {
        withCredentials : true
      });

      toast.success(res.data.message);
      dispatch(fetchData());
    }catch(err){
      if(err.data){
        toast.error(err.data.message)
      }else{
        toast.error('something went wrong ')
      }
    }
  }

  return (
    <div className="px-4 relative">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Admin - Manage Products
      </h1>

      <div
        className="absolute right-6 top-2 flex items-center gap-1 cursor-pointer text-indigo-600 hover:scale-125"
        onClick={handleAddData}
      >
        <span className="text-lg font-serif font-bold">add</span>{" "}
        <VscDiffAdded />
      </div>

      <div className="overflow-x-auto">

        {
          data && data.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S.NO
                </th>
                <th className="py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="pl-4 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {
                data.map((product , index)=>(

                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="">
                      <img src={product.products[0]} className="h-10 w-10 object-cover rounded-md"  alt="product/image" />
                    </td>
                    <td className="pl-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center">
                      <p
                        className="text-yellow-600 hover:text-yellow-900 mr-4"
                        onClick={() => handleEditData(product)}
                      >
                        <BiSolidEdit size={"24"} />
                      </p>
                      <p className="text-red-600 hover:text-red-900"
                      onClick={()=> handleDelete(product._id)}
                      >
                        <TiDelete size={"30"} />
                      </p>
                    </td>
                  </tr>
                ))
              }
                
            </tbody>
          </table>
          
            
          ) : (
           <div className="text-center mt-10 font-mono font-semibold text-emerald-700">Admin didn't any product ! Click Add</div>
          )
        }

      
      </div>
    </div>
  );
};

export default Form;
